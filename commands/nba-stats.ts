import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import { Player, PlayerSeasonStats, Service } from '../models';
import { generatePlayerSearchUrl, generatePlayerStatsUrl, createEmbed } from '../util';

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

export default {
  data,
  // eslint-disable-next-line
  async execute(interaction: CommandInteraction) {
    try {
      let firstName: string;
      let lastName: string;

      const fullName = await interaction.options
        .getString('player_name');

      if (fullName) {
        const splitPlayerName = fullName.split(' ');

        firstName = splitPlayerName[0];
        lastName = splitPlayerName[1];
      }
      else {
        return await interaction.reply('Invalid player name provided');
      }

      const season = await interaction.options.getInteger('season');

      if (!season) {
        return await interaction.reply('Please provide a valid season');
      }

      if (season >= 2021) {
        return await interaction.reply('Invalid season - must be the year the season started in');
      }

      console.log(`playerData request started for ${firstName} ${lastName}`);

      const { data: playerData } = await new Service().get(generatePlayerSearchUrl(firstName, lastName));

      console.log(`playerData request complete for ${firstName} ${lastName}`);

      if (!playerData) {
        console.error(`playerData not found for ${firstName} ${lastName}`);
        return await interaction.reply('No player found');
      }

      await interaction.reply(`Querying the results for ${fullName}'s stats in ${season}`);

      const embeds = [];

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: seasonData } = await new Service().get(generatePlayerStatsUrl(season, player.id));

        if (seasonData.data.length === 0) {
          continue;
        }

        const generatedSeasonStats = new PlayerSeasonStats({ ... seasonData.data[0], season });

        const embed = createEmbed(generatedPlayer, generatedSeasonStats);

        embeds.push(embed);
      }

      if (embeds.length === 0) {
        return await interaction.reply('No data found');
      }

      await interaction.followUp({ embeds });
    }
    catch (e: unknown) {
      console.error(e);

      await interaction.reply('Something went wrong with your request');
    }
  },
};
