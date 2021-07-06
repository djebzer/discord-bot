const projectPath = process.cwd();
const prettyMS = require("pretty-ms");
const client = require(`${projectPath}/main`);

module.exports = {
	name: "uptime",
	description: "How long the bot has been running for",
	cooldown: 10,
	guildOnly: true,
	execute(message) {
		message.reply(`I have been running for **${prettyMS(client.uptime)}**.`);
	},
};