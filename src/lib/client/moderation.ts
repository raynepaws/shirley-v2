import { channels } from "../channels.js";
import { client } from "./index.js";
import { AttachmentBuilder, ButtonBuilder, ButtonStyle, ContainerBuilder, FileBuilder, Guild, GuildAuditLogsEntry, MediaGalleryBuilder, MediaGalleryItemBuilder, MessageFlags, SectionBuilder, SeparatorBuilder, SeparatorSpacingSize, Snowflake, TextChannel, TextDisplayBuilder } from "discord.js";

const messageLogs = async () => await client.channels.fetch(channels.messageLogs) as TextChannel;

client.on("messageDelete", async (message) => {
  if (message.partial) await message.fetch();
  const executor = await new Promise<Snowflake | null>((resolve) => {
    const listener = (auditLogEntry: GuildAuditLogsEntry, guild: Guild) => {
      if (auditLogEntry.actionType !== "Delete" || auditLogEntry.targetType !== "Message") return;
      client.removeListener("guildAuditLogEntryCreate", listener);
      resolve(auditLogEntry.executorId ?? null);
    };
    client.on("guildAuditLogEntryCreate", listener);
    setTimeout(() => resolve(null), 2500);
  });
  let container = new ContainerBuilder()
    .addTextDisplayComponents([
      new TextDisplayBuilder().setContent(`### :x: Message Deleted\n${message.author ? `-# from <@${message.author.id}> ` : ""}in <#${message.channelId}>${executor ? `\n-# deleted by <@${executor}>` : ""}\n-# Sent on <t:${Math.floor(message.createdTimestamp / 1000)}:f>`)
    ]);
  if (message.content) container = container.addSeparatorComponents([
      new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
    ]).addTextDisplayComponents([
      new TextDisplayBuilder().setContent(message.content)
    ]);
  const images = message.attachments.filter((value) => value.width);
  const nonImages = message.attachments.filter((value) => !value.width);
  if (images.size > 0) container = container.addMediaGalleryComponents([
      new MediaGalleryBuilder().addItems(images.map(
        (value) => new MediaGalleryItemBuilder()
          .setDescription(value.description ?? "file")
          .setURL(value.proxyURL)
          .setSpoiler(value.spoiler)
      ))
    ]);
  if (nonImages.size > 0) {
    container = container.addFileComponents(nonImages.map(
      (value) => {
        return new FileBuilder()
          .setURL(`attachment://${value.name}`)
          .setSpoiler(value.spoiler);
      }
    ))
  }
  await (await messageLogs()).send({
    files: nonImages.toJSON(),
    components: [container],
    flags: [MessageFlags.IsComponentsV2],
    allowedMentions: {}
  });
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.partial) await oldMessage.fetch();
  if (newMessage.partial) await newMessage.fetch();
  if (newMessage.author.bot) return;
  if (oldMessage.content !== newMessage.content) {
    let container = new ContainerBuilder()
      .addTextDisplayComponents([
        new TextDisplayBuilder().setContent(`### :pencil2: Message Edited\n${newMessage.author ? `-# from <@${newMessage.author.id}> ` : ""}in <#${newMessage.channelId}>`)
      ]).addSeparatorComponents([
        new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small)
      ]).addTextDisplayComponents([
        new TextDisplayBuilder().setContent(`\`\`\`diff\n${oldMessage.content ? oldMessage.content.split("\n").map((value) => `-${value}`).join("\n") : ""}\n${newMessage.content ? newMessage.content.split("\n").map((value) => `+${value}`).join("\n") : ""}\n\`\`\``)
      ]).addSectionComponents([
        new SectionBuilder()
          .addTextDisplayComponents([
            new TextDisplayBuilder().setContent("_ _")
          ])
          .setButtonAccessory(
            new ButtonBuilder()
              .setLabel("View message")
              .setStyle(ButtonStyle.Link)
              .setURL(`https://discord.com/channels/${newMessage.guildId}/${newMessage.channelId}/${newMessage.id}`)
          )
      ]);
    await (await messageLogs()).send({ 
      components: [container],
      flags: [MessageFlags.IsComponentsV2],
      allowedMentions: {}
    });
  }
});
