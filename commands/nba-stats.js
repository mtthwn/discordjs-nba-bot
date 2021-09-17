const { SlashCommandBuilder } = require('@discordjs/builders');

const { Player, PlayerSeasonStats, Service } = require('../classes');
const { generatePlayerSearchUrl, generatePlayerStatsUrl, createEmbed, logger } = require('../util');

const data = new SlashCommandBuilder()
  .setName('nba-stats')
  .setDescription('Get NBA stats')
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

      if (season >= 2021) {
        return await interaction.reply('Invalid season - must be the year the season started in');
      }

      logger.info(`playerData request started for ${firstName} ${lastName || ''}`);
      const { data: playerData } = await new Service().get(generatePlayerSearchUrl(firstName, lastName));
      logger.info(`playerData request complete for ${firstName} ${lastName || ''}`);

      if (!playerData) {
        logger.warn(`playerData not found for ${firstName} ${lastName || ''}`);
        return await interaction.reply('No player found');
      }

      const embeds = [];

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: seasonData } = await new Service().get(generatePlayerStatsUrl(season, player.id));

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
      logger.error(e.message);

      await interaction.reply('Something went wrong with your request');
    }
  },
};
