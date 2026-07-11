import { client } from "./index.js";

client.on("messageCreate", (message) => {
  if (message.content.includes("3.14")) message.react("🥧");
});
