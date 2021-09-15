const { MessageEmbed } = require('discord.js');

module.exports = (player, stats) => {
  const embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(player.fullName)
    .setDescription(`Player stats for the ${stats.season} regular season`)
    .addFields(
      {
        name: 'Position',
        value: player.position,
        inline: true,
      },
      {
        name: 'Height',
        value: player.height,
        inline: true,
      },
      { name: 'Games played', value: stats.gamesPlayed, inline: true },
      { name: 'Minutes per game', value: stats.min, inline: true },
      {
        name: 'PPG',
        value: stats.points,
        inline: true,
      },
      {
        name: 'Reb per game',
        value: stats.rebounds,
        inline: true,
      },
      {
        name: 'Steals per game',
        value: stats.steals,
        inline: true,
      },
      {
        name: 'FG %',
        value: stats.fgPercentage,
        inline: true,
      },
    )
    .setTimestamp()
    .setFooter('Source: balldontlie.io');

  return embed;

};

