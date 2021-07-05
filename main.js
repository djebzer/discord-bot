// modules
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pkgJSON = require("./package.json");

// initialize client
const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_EMOJIS'],
	owner: "231746671267151872"
});
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
module.exports = client;

/*client.users.fetch(pkgJSON.author_discord_id).then(user => {
	console.log(`BOT MADE BY ${user.tag}`)
});*/

// initialize events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// initialize commands
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// debug handler
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);

// bot login
client.login(BOT_TOKEN);