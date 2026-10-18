import { client } from "./index.js";
import { art } from "../channels.js";

client.on("messageCreate", (message) => {
  if (message.content.includes("3.14")) message.react("🥧");

  if (message.channelId === art) {
      const snapshot = message.messageSnapshots.first();
      const hasAttachment = (message?.attachments.size > 0) || (snapshot?.attachments.size > 0);

      if (hasAttachment) {
          message.react("🍮");
      }
  }
});

client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.partial) return;
    if (user.bot) return;

    if (reaction?.message.channelId === art) {
        if (reaction.emoji.name === "🍮") {
            reaction.users.remove(client.user.id);
        }
    }
});
