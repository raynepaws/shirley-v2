import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("enter-code")
  .setDescription("enter the secret code")
  .addStringOption((input) =>
    input
      .setName("code")
      .setDescription("the code")
  );

export const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const code = interaction.options.getString("code");
  if (code === "beans") {
    await interaction.reply("yes beans");
    return;
  }
  await interaction.reply("no no no");
};
