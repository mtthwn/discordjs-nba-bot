import { MessageEmbed, EmbedFieldData, ColorResolvable } from 'discord.js';
import Player from './Player';
import PlayerSeasonStats from './PlayerSeasonStats';

export class EmbeddedMessage {
  private _color: ColorResolvable;
  private _title: string;
  private _description: string;
  private _fields: EmbedFieldData[];

  constructor(color: ColorResolvable = '#0099ff', title: string, description: string, fields: EmbedFieldData[]) {
    this._title = title;
    this._description = description;
    this._fields = fields;
    this._color = color;
  }

  generateEmbeddedMessage(): MessageEmbed {
    return new MessageEmbed()
      .setColor(this._color)
      .setTitle(this._title)
      .setDescription(this._description)
      .addFields(...this._fields)
      .setTimestamp()
      .setFooter('Source: balldontlie.io');
  }
}

export class PlayerSeasonAverageMessage extends EmbeddedMessage {
  constructor(player: Player, stats: PlayerSeasonStats) {
    super('#009ff',
      player.getFullName,
      `Player stats for the ${stats.getSeason} regular season`,
      PlayerSeasonAverageMessage.generateFields(player, stats),
    );
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