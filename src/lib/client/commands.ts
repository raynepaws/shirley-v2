import { client } from "./index.js";
import { Collection, MessageFlags } from "discord.js";
import { join } from "node:path";
import { readdir } from "node:fs/promises";

client.commands = new Collection();
const foldersPath = join(__dirname, "commands");
const commandFolders = await readdir(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = (await readdir(commandsPath)).filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});
