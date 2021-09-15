const { SlashCommandBuilder } = require('@discordjs/builders');

const { Player, PlayerSeasonStats, Service } = require('../classes');
const { generatePlayerSearchUrl, generatePlayerStatsUrl, createEmbed } = require('../util');

const data = new SlashCommandBuilder()
  .setName('nba')
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

      const { data: playerData } = await new Service().get(generatePlayerSearchUrl(firstName, lastName));

      if (!playerData) {
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
      console.error(e);

      await interaction.reply('Something went wrong');
    }
  },
};
