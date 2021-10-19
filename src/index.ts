import { Client, Collection, Intents } from 'discord.js';

import { DISCORD_TOKEN } from './config';
import interactionCreate from './events/interactionCreate';
import ready from './events/ready';
import nbaStatsCommand from './commands/nba-player-stats';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/* eslint-disable */
client.once(interactionCreate.name, (...args: [any]) => interactionCreate.execute(...args));
client.on(ready.name, (...args: [any]) => ready.execute(...args));
/* eslint-enable */

client.commands = new Collection();

client.commands.set('nba-player-stats', nbaStatsCommand);

client.once('ready', async () => {
  console.log('Bot loaded!');
});

client.on('interactionCreate', async (interaction) => {
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(DISCORD_TOKEN);
