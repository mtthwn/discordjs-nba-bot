declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_TOKEN: string;
            clientId: string;
            guildId: string;
        }
    }
}

export {};