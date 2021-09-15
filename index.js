const { Client, Collection, Intents } = require('discord.js');
const { readdirSync } = require('fs');

// const db = require('./db');
const { DISCORD_TOKEN } = require('./config.json');
const logger = require('./util/logger');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const eventFiles = readdirSync('./events').filter((file) =>
  file.endsWith('.js'),
);

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();

const commandFiles = ['ping', 'server', 'user', 'nba-stats'];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(file, command);
}

client.once('ready', async () => {
  logger.info('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  }
  catch (error) {
    logger.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.login(DISCORD_TOKEN);
