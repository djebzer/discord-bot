const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "moderation",
	title: i18n.__("modules.commands.cmds.help.sub_commands.moderation.command_title"),
	description: i18n.__("modules.commands.cmds.help.sub_commands.moderation.command_desc"),
	permissions: "KICK_MEMBERS",
	callback(message) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(this.permissions)) return;

		let commandLine = "";
		const allCommands = client.commands.filter(command => command.moderation);
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
				{ name: i18n.__("modules.commands.cmds.help.sub_commands.moderation.embed_field_cmds_name"), value: commandLine }
			]
		};

		return message.reply({
			embeds: [ commandsEmbed ]
		});
	}
}