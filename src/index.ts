import { login } from "./lib/client/index.js";
import "./lib/client/announcements.js";
import "./lib/client/commands.js";
import "./lib/client/moderation.js";
import "./lib/client/reactions.js";
import { setPresence } from "./lib/client/presence.js";
import { log } from "./lib/log.js";

process.on("uncaughtException", (error) => {
  log("```\n" + (error.stack ?? error.message) + "\n```");
});

await login();

setPresence();
setInterval(setPresence, 60_000);
