import { client } from "./lib/client.js";
import { configDotenv } from "dotenv";
import { env, exit } from "node:process";
import { log } from "./lib/log.js";
import { setPresence } from "./lib/presence.js";

configDotenv({
  quiet: true // why is this not the default
});

const token = env.DISCORD_TOKEN;
if (!token) {
  console.error("DISCORD_TOKEN environment variable is required");
  exit(1);
}

process.on("uncaughtException", (error) => {
  log(error.stack ?? error.message);
});

await client.login(token);
log("Logged in");

setPresence();
setInterval(setPresence, 60_000);
