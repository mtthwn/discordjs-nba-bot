import { CommandInteraction, MessageEmbed } from 'discord.js';
import { InvalidDateError, InvalidPlayerError, InvalidSeasonError, NoPlayerDataFoundError } from './Error';
import { PlayerGameStatsMessage, PlayerSeasonAverageMessage } from './MessageEmbed';
import Player from './Player';
import PlayerGameStats from './PlayerStats/PlayerGameStats';
import PlayerSeasonAverages from './PlayerStats/PlayerSeasonAverages';
import { SubCommandsEnum } from './Enum';
import Service from './Service';

const APIService = new Service();

export default class MessageEmbedFactory {
  // eslint-disable-next-line
  static async create(interaction: CommandInteraction): Promise<MessageEmbed[]> {

    const splitPlayerName = await interaction.options
      .getString('player_name')?.split(' ') || [''];


    if (!splitPlayerName || splitPlayerName.length < 2) {
      throw new InvalidPlayerError(splitPlayerName);
    }

    const { data: playerData } = await APIService.getPlayerInformation(splitPlayerName[0], splitPlayerName[1]);

    if (!playerData.data) {
      throw new NoPlayerDataFoundError();
    }

    const commandName = await interaction.options.getSubcommand();

    const embeds = [];

    if (commandName === SubCommandsEnum.PLAYER_SEASON_AVERAGES) {
      const season = await interaction.options.getInteger('season') || -1;

      if (!this.isValidSeason(season)) {
        throw new InvalidSeasonError('Invalid season - must be the year the season started in');
      }

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: seasonData } = await APIService.getPlayerSeasonStats(season, player.id);

        if (seasonData.data.length === 0) {
          continue;
        }

        const generatedSeasonStats = new PlayerSeasonAverages({ ...seasonData.data[0], season });

        embeds.push(new PlayerSeasonAverageMessage(generatedPlayer, generatedSeasonStats));
      }
    }

    if (commandName === SubCommandsEnum.PLAYER_GAME_STATS) {
      const date = await interaction.options.getString('date') || '';

      if (!this.isValidDate(date)) {
        throw new InvalidDateError();
      }

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: gameData } = await APIService.getPlayerGameStats(date, player.id);

        if (gameData.data.length === 0) {
          continue;
        }

        const generatedGameStats = new PlayerGameStats({ ...gameData.data[0], date });

        embeds.push(new PlayerGameStatsMessage(generatedPlayer, generatedGameStats, date));
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

  static isValidSeason(season: number): boolean {
    if (!season) {
      return false;
    }

    if (season >= 2021) {
      return false;
    }

    return true;
  }
}