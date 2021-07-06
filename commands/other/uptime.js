const projectPath = process.cwd();
const prettyMS = require("pretty-ms");
const client = require(`${projectPath}/main`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "uptime",
	description: "How long the bot has been running for",
	description: i18n.__("modules.commands.cmds.uptime.command_desc"),
	cooldown: 10,
	guildOnly: true,
	execute(message) {
		message.reply(i18n.__mf("modules.commands.cmds.uptime.answer", { uptime: prettyMS(client.uptime) }));
	},
};