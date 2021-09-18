import { Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client): void {
    if (client.user) {
      console.log(`Ready! Logged in as ${client.user.tag}`);
    }
  },
};
