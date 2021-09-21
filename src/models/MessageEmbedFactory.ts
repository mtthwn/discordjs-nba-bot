import { CommandInteraction } from 'discord.js';
import { InvalidPlayerError, InvalidSeasonError, NoPlayerDataFoundError } from './Error';
import { PlayerSeasonAverageMessage } from './MessageEmbed';
import Player from './Player';
import PlayerSeasonStats from './PlayerSeasonStats';
import Service from './Service';

const APIService = new Service();

export default class MessageEmbedFactory {
  // eslint-disable-next-line
  static async create(messageType: string, interaction: CommandInteraction): Promise<PlayerSeasonAverageMessage[]> {
    let firstName: string;
    let lastName: string;

    const fullName = await interaction.options
      .getString('player_name');

    if (fullName) {
      const splitPlayerName = fullName.split(' ');

      firstName = splitPlayerName[0];
      lastName = splitPlayerName[1];
    }
    else {
      throw new InvalidPlayerError('');
    }
    const season = await interaction.options.getInteger('season');

    if (!season) {
      throw new InvalidSeasonError(null);
    }

    if (season >= 2021) {
      throw new InvalidSeasonError('Invalid season - must be the year the season started in');
    }

    const { data: playerData } = await APIService.getPlayerInformation(firstName, lastName);

    if (!playerData.data) {
      throw new InvalidPlayerError(`${firstName} ${lastName || ''}`);
    }

    const embeds = [];

    for (const player of playerData.data) {
      const generatedPlayer = new Player(player);

      const { data: seasonData } = await APIService.getPlayerSeasonStats(season, player.id);

      if (seasonData.data.length === 0) {
        continue;
      }

      const generatedSeasonStats = new PlayerSeasonStats({ ...seasonData.data[0], season });

      const embed = new PlayerSeasonAverageMessage(generatedPlayer, generatedSeasonStats);

      embeds.push(embed);
    }

    if (embeds.length === 0) {
      throw new NoPlayerDataFoundError();
    }

    return embeds;
  }
}