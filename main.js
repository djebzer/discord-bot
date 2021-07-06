require("dotenv").config();
const projectPath = process.cwd();
const fs = require("fs");

// initialize client
const config = require(`${projectPath}/config.json`);
const Discord = require("discord.js");
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_EMOJIS'],
	owner: "231746671267151872"
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
module.exports = client;

// initialize events
const eventFiles = fs.readdirSync(`${projectPath}/events`).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`${projectPath}/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// initialize commands
const commandFolders = fs.readdirSync(`${projectPath}/commands`);
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`${projectPath}/commands/${folder}`).filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`${projectPath}/commands/${folder}/${file}`);
		if (command.disabled) continue;
		client.commands.set(command.name, command);
	}
}

// debug handler
client.on("error", console.error);
client.on("warn", console.warn);
//client.on("debug", console.log);

// bot login
client.login(process.env.BOT_TOKEN);