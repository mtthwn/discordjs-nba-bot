import { Message } from 'discord.js';

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, Command>
        user: User
    }

    export interface Command {
        name: string,
        description: string,
        execute: (message: Message, args: string[]) => SomeType
    }

    export interface Interaction {
        user: User,
        channel: InteractionChannel,
        commandName: string,
        reply: (args: SomeType) => SomeType
    }
}