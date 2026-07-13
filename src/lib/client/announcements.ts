import { channels } from "../channels.js";
import { client } from "./index.js";
import { ContainerBuilder, MessageFlags, TextChannel, TextDisplayBuilder } from "discord.js";

client.on("emojiCreate", async (emoji) => {
  await (await client.channels.fetch(channels.general) as TextChannel).send({
    components: [
      new ContainerBuilder()
        .addTextDisplayComponents([
          new TextDisplayBuilder()
            .setContent(`**New emoji added:** \`:${emoji.name}:\` ${emoji}`)
        ])
    ],
    flags: [MessageFlags.IsComponentsV2]
  });
});

client.on("guildMemberAdd", async (member) => {
  const messages = [
    "everyone welcome {member}!!!",
    "hi {member}!! welcome to rws!",
    "{member} hopped in",
    "{member} entered the chat",
    "{member} joined",
    "{member} has joined the party",
    "{member} arose from the depths of discordia",
    "{member} just joined and hopefully isn't a bot",
    "{member} has joined",
    "welcome {member}!",
    "hi new member {member}"
  ];
  await (await client.channels.fetch(channels.general) as TextChannel).send({
    components: [
      new ContainerBuilder()
        .addTextDisplayComponents([
          new TextDisplayBuilder()
            .setContent(messages[Math.floor(Math.random() * messages.length)].replace("{member}", `<@${member.id}>`))
        ])
    ],
    flags: [MessageFlags.IsComponentsV2]
  });
});

client.on("guildMemberRemove", async (member) => {
  const messages = [
    "bye {member} :<",
    "{member} left",
    "{member} left the server",
    "{member} abstracted"
  ];
  await (await client.channels.fetch(channels.general) as TextChannel).send({
    components: [
      new ContainerBuilder()
        .addTextDisplayComponents([
          new TextDisplayBuilder()
            .setContent(messages[Math.floor(Math.random() * messages.length)].replace("{member}", `<@${member.id}>`))
        ])
    ],
    flags: [MessageFlags.IsComponentsV2]
  });
});
