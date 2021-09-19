import { MessageEmbed, EmbedFieldData } from 'discord.js';
import Player from './Player';
import PlayerSeasonStats from './PlayerSeasonStats';

export class PlayerSeasonAverageMessage extends MessageEmbed {
  constructor(player: Player, stats: PlayerSeasonStats) {
    super({
      color: 'AQUA',
      title: player.getFullName,
      description: `Player stats for the ${stats.getSeason} regular season`,
      fields: PlayerSeasonAverageMessage.generateFields(player, stats),
      footer: { text: 'Source: balldontlie.io' }, timestamp: new Date(),
    });
  }

  static generateFields(player: Player, stats: PlayerSeasonStats): EmbedFieldData[] {
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