import { CommandInteraction, MessageEmbed } from 'discord.js';
import { InvalidDateError, InvalidPlayerError, InvalidSeasonError, NoPlayerDataFoundError } from './Error';
import { PlayerGameStatsMessage, PlayerSeasonAverageMessage } from './MessageEmbed';
import Player from './Player';
import { PlayerSeasonAverages, PlayerStats } from './PlayerStats';
import { SubCommandsEnum } from './Enum';
import Service from './Service';

const APIService = new Service();

export default class MessageEmbedFactory {
  // eslint-disable-next-line
  static async create(interaction: CommandInteraction): Promise<MessageEmbed[]> {

    const splitPlayerName = await interaction.options
      .getString('player_name')?.split(' ');

    if (!splitPlayerName) {
      throw new InvalidPlayerError(splitPlayerName);
    }

    const { data: playerData } = await APIService.getPlayerInformation(splitPlayerName[0], splitPlayerName[1]);

    if (!playerData.data) {
      throw new NoPlayerDataFoundError();
    }

    const commandName = await interaction.options.getSubcommand();

    const embeds = [];

    if (commandName === SubCommandsEnum.PLAYER_SEASON_AVERAGES) {
      const season = await interaction.options.getInteger('season');

      if (!season) {
        throw new InvalidSeasonError(null);
      }

      if (season >= 2021) {
        throw new InvalidSeasonError('Invalid season - must be the year the season started in');
      }

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: seasonData } = await APIService.getPlayerSeasonStats(season, player.id);

        if (seasonData.data.length === 0) {
          continue;
        }

        const generatedSeasonStats = new PlayerSeasonAverages({ ...seasonData.data[0], season });

        const embed = new PlayerSeasonAverageMessage(generatedPlayer, generatedSeasonStats);

        embeds.push(embed);
      }
    }

    if (commandName === SubCommandsEnum.PLAYER_GAME_STATS) {
      const date = await interaction.options.getString('date') || '';

      const isValidDate = this.isValidDate(date);

      if (!isValidDate) {
        throw new InvalidDateError();
      }

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: gameData } = await APIService.getPlayerGameStats(date, player.id);

        if (gameData.data.length === 0) {
          continue;
        }

        const generatedGameStats = new PlayerStats({ ...gameData.data[0] });

        const embed = new PlayerGameStatsMessage(generatedPlayer, generatedGameStats, date);

        embeds.push(embed);
      }
    }

    return embeds;
  }

  static isValidDate(dateString: string): boolean {
    const formattedDate = new Date(dateString);

    if (formattedDate.getFullYear() > 2020) {
      return false;
    }

    if (!formattedDate.getTime() && formattedDate.getTime() !== 0) {
      return false;
    }

    return true;
  }
}