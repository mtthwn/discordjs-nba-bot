import dotenv from 'dotenv';

dotenv.config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

// const foundCommands = [];
// const commandFiles = fs
//   .readdirSync('./commands')
//   .filter((file: string) => file.endsWith('.js'));

// for (const file of commandFiles) {
//   import command from `./commands/${file}`;
//   foundCommands.push(command.data.toJSON());
// }

import nbaStatsCommands from './commands/nba-stats';

const commandFiles = [nbaStatsCommands.data.toJSON()];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    console.log(commandFiles);

    // scoped to guild, removing guildId scopes globally
    await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {
      body: commandFiles,
    });

    console.log('Successfully reloaded application (/) commands.');
  }
  catch (error) {
    console.error(error);
  }
})();
