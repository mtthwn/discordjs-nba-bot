import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import MessageEmbedFactory from '../models/MessageEmbedFactory';

const data = new SlashCommandBuilder()
  .setName('nba-player-stats')
  .setDescription('NBA player stats')
  .addSubcommand((subCommand) =>
    subCommand
      .setName('season-averages')
      .setDescription('Season averages')
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
            'The starting year of the season\'s averages you want to query',
          )
          .setRequired(true),
      ),
  ).addSubcommand(subCommand => subCommand
    .setName('game-stats')
    .setDescription('Game stats')
    .addStringOption(option =>
      option.setName('player_name')
        .setDescription('Player name')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('date')
        .setDescription('Date of the game in YYYY-MM-DD format')
        .setRequired(true)));


export default {
  data,
  // eslint-disable-next-line
  async execute(interaction: CommandInteraction) {
    try {

      await interaction.reply('Starting up the search');

      const embeds = await MessageEmbedFactory.create(interaction);

      if (embeds.length === 0) {
        await interaction.followUp('No data was returned');
        return;
      }

      await interaction.followUp({ embeds });
    }
    catch (e) {
      await interaction.followUp((e as Error).message);
    }
  },
};
