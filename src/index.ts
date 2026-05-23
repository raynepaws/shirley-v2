import { ActivityType } from "discord.js";
import { client } from "./lib/client.js";
import { configDotenv } from "dotenv";
import { env, exit } from "node:process";
import { log } from "./lib/log.js";
import { Presence, presences } from "./lib/statuses.js";

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

const setPresence = () => {
  let presence: Presence;
  let matchesCriteria;
  do {
    presence = presences[Math.floor(Math.random() * presences.length)];
    matchesCriteria = typeof presence === "string" || !presence.criteria || presence.criteria();
  } while (!matchesCriteria)
  let activities = typeof presence === "string" ? [] : presence.activities ?? [];
  if (typeof presence === "string" || (typeof presence === "object" && presence.content)) activities.push({
    name: typeof presence === "string" ? presence : typeof presence.content === "function" ? presence.content() : presence.content!,
    type: ActivityType.Custom
  });
  client.user?.setPresence({
    activities,
    status: typeof presence === "string" ? "online" : presence.status ?? "online"
  })
};

setPresence();
setInterval(setPresence, 60_000);
