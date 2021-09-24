import dotenv from 'dotenv';

dotenv.config();

export const NBA_API_URL = process.env.NBA_API_URL || 'https://www.balldontlie.io/api/v1/';
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN || '';
export const guildId = process.env.guildId || '';
export const clientId = process.env.clientId || '';
