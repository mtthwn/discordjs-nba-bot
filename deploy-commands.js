const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, DISCORD_TOKEN } = require('./config.json');

const commands = [];
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// const commands = [
//   new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Replies with pong!'),
//   new SlashCommandBuilder()
//     .setName('server')
//     .setDescription('Replies with server info!'),
//   new SlashCommandBuilder()
//     .setName('user')
//     .setDescription('Replies with user info!'),
// ].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Successfully registered application commands.');
  }
  catch (error) {
    console.error(error);
  }
})();
