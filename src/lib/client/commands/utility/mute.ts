import { CacheType, ChatInputCommandInteraction, ContainerBuilder, MessageFlags, SlashCommandBuilder, TextDisplayBuilder } from "discord.js";
import { client } from "../../index.js";
import { parseDuration } from "../../../duration.js";

export const data = new SlashCommandBuilder()
  .setName("mute")
  .setDescription("prevent a user from sending messages for a supplied length of time")
  .addUserOption((input) =>
    input
      .setName("user")
      .setDescription("user to mute")
      .setRequired(true)
  )
  .addStringOption((input) =>
    input
      .setName("duration")
      .setDescription("how long to time them out for")
      .setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  const durationString = interaction.options.getString("duration")?.trim();
  if (typeof durationString !== "string") return;
  const duration = parseDuration(durationString);
  const userId = interaction.options.getUser("user")!.id;
  await (await client.guilds.cache.get("1327892346758762538")!.members.fetch(userId)).timeout(duration * 1000);
  await interaction.reply({
    components: [
      new ContainerBuilder()
        .addTextDisplayComponents([
          new TextDisplayBuilder()
            .setContent(`Timed <@${userId}> out for **${duration}** seconds`)
        ])
    ],
    flags: [MessageFlags.IsComponentsV2],
    allowedMentions: {}
  });
};
