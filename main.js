require("dotenv").config();
const projectPath = process.cwd();
const fs = require("fs");
const i18n = require("i18n");

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

// initialize localization & locales
i18n.configure({
	locales: ["en", "fr"],
	defaultLocale: "en",
	retryInDefaultLocale: true,
	directory: `${projectPath}/locales`,
	objectNotation: true,
	logWarnFn: function (msg) {
   	console.log("warn", msg);
  	},
  	logErrorFn: function (msg) {
   	console.log("error", msg);
  	},
  	missingKeyFn: function (locale, value) {
   	return value;
  	},
	register: global,
	mustacheConfig: {
		tags: ['{{', '}}'],
		disable: false
	}
});
i18n.setLocale(config.language);
module.exports.i18n = i18n;

// debug handler
client.on("error", console.error);
client.on("warn", console.warn);
//client.on("debug", console.log);

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

// bot login
client.login(process.env.BOT_TOKEN);