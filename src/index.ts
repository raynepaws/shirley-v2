import { client } from "./lib/client.js";
import { configDotenv } from "dotenv";
import { env, exit } from "node:process";

configDotenv({
  quiet: true // why is this not the default
});

const token = env.DISCORD_TOKEN;
if (!token) {
  console.error("DISCORD_TOKEN environment variable is required");
  exit(1);
}

await client.login(token);
console.log("Logged in");
