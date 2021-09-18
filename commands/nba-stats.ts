import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

import Player from '../models/Player';
import PlayerSeasonStats from '../models/PlayerSeasonStats';
import Service from '../models/Service';
import { InvalidSeasonError, InvalidPlayerError, NoPlayerDataFoundError } from '../models/Error';
import createEmbed from './../util/createEmbed';

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

const APIService = new Service();

export default {
  data,
  // eslint-disable-next-line
  async execute(interaction: CommandInteraction) {
    try {

      await interaction.reply('Starting up the search');

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
        throw new InvalidPlayerError('');
      }

      const season = await interaction.options.getInteger('season');

      if (!season) {
        throw new InvalidSeasonError(null);
      }

      if (season >= 2021) {
        throw new InvalidSeasonError('Invalid season - must be the year the season started in');
      }

      console.log(`playerData request started for ${firstName} ${lastName}`);

      const { data: playerData } = await APIService.getPlayerInformation(firstName, lastName);

      console.log(`playerData request complete for ${firstName} ${lastName}`);

      if (!playerData.data) {
        throw new InvalidPlayerError(`${firstName} ${lastName || ''}`);
      }

      const embeds = [];

      for (const player of playerData.data) {
        const generatedPlayer = new Player(player);

        const { data: seasonData } = await APIService.getPlayerSeasonStats(season, player.id);

        if (seasonData.data.length === 0) {
          continue;
        }

        const generatedSeasonStats = new PlayerSeasonStats({ ... seasonData.data[0], season });

        const embed = createEmbed(generatedPlayer, generatedSeasonStats);

        embeds.push(embed);
      }

      if (embeds.length === 0) {
        throw new NoPlayerDataFoundError();
      }

      await interaction.followUp({ embeds });
    }
    catch (e) {
      await interaction.followUp((e as Error).message);
    }
  },
};
