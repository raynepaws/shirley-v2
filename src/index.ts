import { login } from "./lib/client/index.js";
import "./lib/client/announcements.js";
import "./lib/client/commands.js";
import "./lib/client/moderation.js";
import "./lib/client/reactions.js";
import { setPresence } from "./lib/client/presence.js";
import { setUpRandomAnnouncements } from "./lib/client/announcements.js";
import { log } from "./lib/log.js";
import { configDotenv } from "dotenv";

configDotenv({ quiet: true });

process.on("uncaughtException", (error) => {
  log("```\n" + (error.stack ?? error.message) + "\n```");
});

await login();

setPresence();
setInterval(setPresence, 150_000);
setUpRandomAnnouncements();
