const { SlashCommandBuilder } = require('@discordjs/builders');

const Service = require('../util/service');
const createEmbed = require('../util/createEmbed');
const Player = require('../classes/Player');
const PlayerSeasonStats = require('../classes/PlayerSeasonStats');
const generatePlayerStatsUrl = require('../util/generatePlayerStatsUrl');

const { PLAYER_SEARCH_URI } = require('../constants');

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

      const { data: playerData } = await new Service().get(searchUrl);

      if (!playerData) {
        return await interaction.reply('No player found');
      }

      const embeds = [];

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const PLAYER_STATS_SEARCH_URI = generatePlayerStatsUrl(season, player.id);

        const { data: seasonData } = await new Service().get(PLAYER_STATS_SEARCH_URI);

        if (seasonData.data.length === 0) {
          continue;
        }

        const generatedSeasonStats = new PlayerSeasonStats({ ...seasonData.data[0], season });

        const embed = createEmbed(generatedPlayer, generatedSeasonStats);

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
