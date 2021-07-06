const projectPath = process.cwd();
const fs = require("fs");
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");

const subCommands = new Discord.Collection();
const subCommandsFiles = fs.readdirSync(`${projectPath}/commands/built-in/help-commands`).filter(file => file.endsWith('.js'));
for (const file of subCommandsFiles) {
	const subCommand = require(`${projectPath}/commands/built-in/help-commands/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

module.exports = {
	name: "help",
	description: "Information about the bot commands",
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
						• \`${config.bot.prefix+ this.name} ${command.name}\` - ${command.description}.
					`
				});
			});

			const helpPanel = new Discord.MessageEmbed({
				color: config.bot.color,
				title: "Help",
				description: "Here is the list of the bot useful commands:",
				thumbnail: {
					url: client.user.avatarURL()
				},
				fields: customFields
			});

			message.reply({
				content: `Need some help <@${message.author.id}>? Here is everything you should know:`,
				embeds: [ helpPanel ]
			});
		}

		// sub commands
		if (subCommand) {
			subCommand.callback(message);
		}
	},
};