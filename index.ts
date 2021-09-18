import dotenv from 'dotenv';

dotenv.config();

import { Client, Collection, Intents, Interaction } from 'discord.js';

import interactionCreate from './events/interactionCreate';
import ready from './events/ready';
import nbaStatsCommand from './commands/nba-stats';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/* eslint-disable */
client.once(interactionCreate.name, (...args: [any]) => interactionCreate.execute(...args));
client.on(ready.name, (...args: [any]) => ready.execute(...args));
/* eslint-enable */

client.commands = new Collection();

client.commands.set('nba-stats', nbaStatsCommand);

client.once('ready', async () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  console.log(command);

  try {
    await command.default.execute(interaction);
  }
  catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
