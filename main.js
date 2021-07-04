// Modules
require("dotenv").config();
const fs = require("fs");
const discord = require("discord.js");
const client = new discord.Client();
module.exports = client;

// Initialize events
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Bot login
client.login(process.env.BOT_TOKEN);