const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const PLAYER_SEARCH_URI = 'https://balldontlie.io/api/v1/players?search=';
// const ALL_TEAMS_URI = 'https://balldontlie.io/api/v1/teams';

const data = new SlashCommandBuilder()
  .setName('nba')
  .setDescription('Get NBA stats')
  // .addSubcommand((subCommand) =>
  //   subCommand
  //     .setName('team-name')
  //     .setDescription('Team name')
  //     .addStringOption((option) =>
  //       option.setName('team_name').setDescription('Team name'),
  //     ),
  // )
  .addSubcommand((subCommand) =>
    subCommand
      .setName('player-search')
      .setDescription('Player search')
      .addStringOption((option) =>
        option
          .setName('player_name')
          .setDescription('Player name')
          .setRequired(true),
      )
      .addIntegerOption((option) =>
        option
          .setName('season')
          .setDescription(
            'The starting year of the season\'s stats you want to query',
          )
          .setRequired(true),
      ),
  );

module.exports = {
  data,
  async execute(interaction) {
    try {
      const [firstName, lastName] = await interaction.options
        .getString('player_name')
        .split(' ');

      const season = await interaction.options.getInteger('season');

      const searchUrl =
        PLAYER_SEARCH_URI + `${firstName || ''} ${lastName || ''}`;

      const { data: playerData } = await axios.get(searchUrl);

      if (!playerData) {
        return await interaction.reply('No player found');
      }

      const { data: returnedPlayers } = playerData;

      const embeds = [];

      for (const player of returnedPlayers) {
        const PLAYER_STATS_SEARCH_URI = `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${player.id}`;

        const returnedSeasonStats = await axios.get(PLAYER_STATS_SEARCH_URI);

        const { data: seasonData } = returnedSeasonStats.data;

        if (!seasonData[0]) {
          return await interaction.reply('Invalid season');
        }

        const { pts, games_played, min } = seasonData[0];

        const height = player.height_feet
          ? `${player.height_feet} ft ${player.height_inches} in`
          : 'No height data available';

        const embed = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`${player.first_name} ${player.last_name}`)
          .setDescription(`Player stats for the ${season} regular season`)
          .addFields(
            {
              name: 'Position',
              value:
                player.position.length > 0
                  ? player.position
                  : 'No position data available',
              inline: true,
            },
            {
              name: 'Height',
              value: height,
              inline: true,
            },
            { name: 'Games played', value: games_played.toString(), inline: true },
            { name: 'Minutes per game', value: min.toString(), inline: true },
            {
              name: 'PPG',
              value: pts.toString(),
              inline: true,
            },
          )
          .setTimestamp()
          .setFooter('Stats sourced from the balldontlie api');

        embeds.push(embed);
      }

      if (embeds.length === 0) {
        return await interaction.reply('No data found');
      }
      await interaction.reply({ embeds });
    }
    catch (e) {
      console.error(e);

      await interaction.reply('Something went wrong');
    }
  },
};
