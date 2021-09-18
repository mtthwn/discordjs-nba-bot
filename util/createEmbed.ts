import { MessageEmbed } from 'discord.js';
import { Player, PlayerSeasonStats } from '../models';

export default (player: Player, stats: PlayerSeasonStats): MessageEmbed => (new MessageEmbed()
  .setColor('#0099ff')
  .setTitle(player.getFullName)
  .setDescription(`Player stats for the ${stats.getSeason} regular season`)
  .addFields(
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
  )
  .setTimestamp()
  .setFooter('Source: balldontlie.io')
);
