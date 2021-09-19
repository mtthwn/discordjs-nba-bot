import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DISCORD_TOKEN, clientId, guildId } from './config';

import nbaStatsCommands from './commands/nba-stats';

const commandFiles = [nbaStatsCommands.data.toJSON()];

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // scoped to guild, removing guildId scopes globally
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandFiles,
    });

    console.log('Successfully reloaded application (/) commands.');
  }
  catch (error) {
    console.error(error);
  }
})();
