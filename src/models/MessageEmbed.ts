import { MessageEmbed, EmbedFieldData } from 'discord.js';
import Player from './Player';
import PlayerGameStats from './PlayerStats/PlayerGameStats';
import PlayerSeasonAverages from './PlayerStats/PlayerSeasonAverages';

export class PlayerSeasonAverageMessage extends MessageEmbed {
  constructor(player: Player, stats: PlayerSeasonAverages) {
    super({
      color: 'AQUA',
      title: `${player.getFullName}'s season averages`,
      description: `Player stats for the ${stats.getSeason} regular season`,
      fields: PlayerSeasonAverageMessage.generateFields(player, stats),
      footer: { text: 'Source: balldontlie.io' }, timestamp: new Date(),
    });
  }

  static generateFields(player: Player, stats: PlayerSeasonAverages): EmbedFieldData[] {
    return [
      {
        name: 'Position',
        value: player.getPosition,
        inline: true,
      },
      {
        name: 'Height',
        value: player.getHeight,
        inline: true,
      },
      { name: 'Games played', value: stats.getGamesPlayed, inline: true },
      { name: 'Minutes per game', value: stats.getMinutes, inline: true },
      {
        name: 'PPG',
        value: stats.getPoints,
        inline: true,
      },
      {
        name: 'APG',
        value: stats.getAssists,
        inline: true,
      },
      {
        name: 'Reb per game',
        value: stats.getRebounds,
        inline: true,
      },
      {
        name: 'Steals per game',
        value: stats.getSteals,
        inline: true,
      },
      {
        name: 'FG %',
        value: stats.getFgPercentage,
        inline: true,
      },
    ];
  }
}

export class PlayerGameStatsMessage extends MessageEmbed {
  constructor(player: Player, stats: PlayerGameStats, date: string) {
    super({
      color: 'LUMINOUS_VIVID_PINK',
      title: `${player.getFullName} stats for ${date}`,
      description: `Player stats for the game on ${stats.getDate}`,
      fields: PlayerGameStatsMessage.generateFields(stats),
      footer: { text: 'Source: balldontlie.io' }, timestamp: new Date(),
    });
  }

  static generateFields(stats: PlayerGameStats): EmbedFieldData[] {
    return [
      { name: 'Minutes played', value: stats.getMinutes, inline: true },
      {
        name: 'Points',
        value: stats.getPoints,
        inline: true,
      },
      {
        name: 'Assists',
        value: stats.getAssists,
        inline: true,
      },
      {
        name: 'Rebounds',
        value: stats.getRebounds,
        inline: true,
      },
      {
        name: 'Steals',
        value: stats.getSteals,
        inline: true,
      },
      {
        name: 'FG %',
        value: stats.getFgPercentage,
        inline: true,
      },
    ];
  }
}