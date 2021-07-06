const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "ping",
	description: i18n.__("modules.commands.cmds.ping.command_desc"),
	cooldown: 10,
	guildOnly: true,
	execute(message) {
		message.reply(i18n.__mf("modules.commands.cmds.ping.answer", { latency: Math.round(client.ws.ping) }));
	},
};