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
        option.setName('season').setDescription('Season').setRequired(true),
      ),
  );

module.exports = {
  data,
  async execute(interaction) {
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

      let returnedSeasonStats;

      try {
        returnedSeasonStats = await axios.get(PLAYER_STATS_SEARCH_URI);
      }
      catch (e) {
        console.error(e);
      }

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
        .setDescription(`Player stats for the ${season} season`)
        .addFields(
          {
            name: 'Position',
            value:
              player.position.length > 0
                ? player.position
                : 'No position data available',
          },
          {
            name: 'Height',
            value: height,
          },
          { name: 'Games played', value: games_played.toString() },
          { name: 'Minutes per game', value: min.toString() },
          {
            name: 'PPG',
            value: pts.toString(),
          },
        )
        .setTimestamp();

      embeds.push(embed);
    }

    interaction.reply({ embeds });
  },
};
