import { User } from 'discord.js';

interface Interaction {
  user: User;
  channel: InteractionChannel
}

interface InteractionChannel {
  name: string;
}

export default {
  name: 'interactionCreate',
  execute(interaction: Interaction): void {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`,
    );
  },
};