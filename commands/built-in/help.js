const projectPath = process.cwd();
const fs = require("fs");
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const { i18n } = require(`${projectPath}/main`);

const subCommands = new Discord.Collection();
const subCommandsFiles = fs.readdirSync(`${projectPath}/commands/built-in/help-commands`).filter(file => file.endsWith('.js'));
for (const file of subCommandsFiles) {
	const subCommand = require(`${projectPath}/commands/built-in/help-commands/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

module.exports = {
	name: "help",
	description: i18n.__("modules.commands.cmds.help.command_desc"),
	aliases: ["h", "how", "plz"],
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
		const subCommand = subCommands.get(args[0]);
		if (!args[0] || !subCommand) {
			const customFields = [];
			subCommands.forEach(command => {
				if (command.disabled) return;
				customFields.push({
					name: command.title,
					value: `
						• \`${config.bot.prefix + this.name} ${command.name}\` - ${command.description}.
					`
				});
			});

			const helpPanel = new Discord.MessageEmbed({
				color: config.bot.color,
				title: i18n.__("modules.commands.cmds.help.title"),
				description: i18n.__("modules.commands.cmds.help.description"),
				thumbnail: {
					url: client.user.avatarURL()
				},
				fields: customFields
			});

			message.reply({
				content: i18n.__mf("modules.commands.cmds.help.embed_title", { author_id: message.author.id }),
				embeds: [ helpPanel ]
			});
		}

		// sub commands
		if (subCommand) {
			subCommand.callback(message);
		}
	},
};