import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('nba-team-stats')
  .setDescription('NBA team stats')
  .addSubcommand(subCommand => subCommand
    .setName('team-stats')
    .setDescription('Game stats')
    .addStringOption(option =>
      option.setName('team_name')
        .setDescription('Team name')
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
    }
    catch (e) {
      await interaction.followUp((e as Error).message);
    }
  },
};
