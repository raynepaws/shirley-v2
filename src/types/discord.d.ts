import { CacheType, ChatInputCommandInteraction, Collection, SlashCommandBuilder } from "discord.js";

interface Command {
  data: SlashCommandBuilder,
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void> | void
}

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
    }
}
