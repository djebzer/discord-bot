const projectPath = process.cwd();
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "number",
	description: i18n.__("modules.commands.cmds.number.command_desc"),
	usage: "<min> <max>",
	args: true,
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		if (!args[1]) {
			return message.reply(i18n.__("modules.commands.cmds.number.error"));
		}

		// generate a random number
		let min = parseInt(args[0]);
		let max = parseInt(args[1]);

		if (min === max) {
			return message.reply(i18n.__mf("modules.commands.cmds.number.answer", { number: n1 }));
		}

		let result = Math.floor(Math.random() * (max - min + 1)) + min;
		message.reply(i18n.__mf("modules.commands.cmds.number.answer", { number: result }));
	},
};