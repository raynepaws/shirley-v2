import { channels } from "./channels.js";
import { client } from "./client.js";

export const log = async (data: string) => {
  console.log(data);
  const channel = await client.channels.fetch(channels.shirleyLogs);
  if (channel?.isTextBased() && channel.isSendable()) {
    await channel.send(data);
  }
};
