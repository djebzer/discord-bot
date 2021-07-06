const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "commands",
	title: i18n.__("modules.commands.cmds.help.sub_commands.commands.command_title"),
	description: i18n.__("modules.commands.cmds.help.sub_commands.commands.command_desc"),
	callback(message) {
		let commandLine = "";
		const allCommands = client.commands.filter(command => !command.moderation);
		allCommands.forEach(command => {
			if (!command.name) return;
			var usage = (command.usage) ? ` ${command.usage}` : "";
			commandLine += `\n• \`${config.bot.prefix + command.name + usage}\` - ${command.description}.`;
		})

		const commandsEmbed = {
			color: config.bot.color,
			title: this.title,
			description: this.description,
			fields: [
				{ name: i18n.__("modules.commands.cmds.help.sub_commands.commands.embed_field_cmds_name"), value: commandLine }
			]
		};

		return message.reply({
			embeds: [ commandsEmbed ]
		});
	}
}