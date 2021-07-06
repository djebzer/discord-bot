const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");

module.exports = {
	name: "commands",
	title: "Commands",
	description: "List of all bot commands",
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
			title: "Commands list",
			description: this.description,
			fields: [
				{ name: this.title, value: commandLine }
			]
		};

		return message.reply({
			embeds: [ commandsEmbed ]
		});
	}
}