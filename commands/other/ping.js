const projectPath = process.cwd();
const client = require(`${projectPath}/main`);

module.exports = {
	name: "ping",
	description: "Output the bot's latency in miliseconds",
	cooldown: 10,
	guildOnly: true,
	execute(message) {
		message.reply(`My latency: **${Math.round(client.ws.ping)}ms**.`);
	},
};