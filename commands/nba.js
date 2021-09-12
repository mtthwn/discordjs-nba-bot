const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const PLAYER_SEARCH_URI = 'https://balldontlie.io/api/v1/players?search=';
// const ALL_TEAMS_URI = 'https://balldontlie.io/api/v1/teams';

const data = new SlashCommandBuilder()
  .setName('nba')
  .setDescription('Get NBA stats')
  .addSubcommand((subCommand) =>
    subCommand
      .setName('team-name')
      .setDescription('Team name')
      .addStringOption((option) =>
        option.setName('team_name').setDescription('Team name'),
      ),
  )
  .addSubcommand((subCommand) =>
    subCommand
      .setName('player-name')
      .setDescription('Player name')
      .addStringOption((option) =>
        option.setName('player_name').setDescription('Player name'),
      ),
  );

module.exports = {
  data,
  async execute(interaction) {
    const [firstName, lastName] = await interaction.options
      .getString('player_name')
      .split(' ');

    const searchUrl =
      PLAYER_SEARCH_URI + `${firstName || ''} ${lastName || ''}`;

    const { data: playerData } = await axios.get(searchUrl);

    const { data: returnedPlayers } = playerData;

    const embeds = [];

    for (const player of returnedPlayers) {
      console.log(player.team);
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${player.first_name} ${player.last_name}`)
        .setDescription('Player stats')
        .addFields(
          { name: 'Position', value: player.position },
          {
            name: 'Height',
            value: `${player.height_feet} ft ${player.height_inches} in`,
          },
          { name: 'Team', value: `${player.team.full_name} ` },
        )
        .setTimestamp();

      embeds.push(embed);
    }

    interaction.reply({ embeds });
  },
};
