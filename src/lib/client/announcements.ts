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
