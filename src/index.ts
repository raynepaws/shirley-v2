import { login } from "./lib/client/index.js";
import "./lib/client/moderation.js";
import "./lib/client/reactions.js";
import { configDotenv } from "dotenv";
import { setPresence } from "./lib/presence.js";
import { log } from "./lib/log.js";

process.on("uncaughtException", (error) => {
  log("```\n" + (error.stack ?? error.message) + "\n```");
});

configDotenv({
  quiet: true // why is this not the default
});

await login();

setPresence();
setInterval(setPresence, 60_000);
