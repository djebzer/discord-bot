const config = require("../../config.json");
const client = require("../../main");
const Discord = require("discord.js");

const subCommands = {
	commands: {
		description: "List of all bot commands",
		callback(message) {
			return message.reply(`Commands description: ${this.description}`);
		}
	}
}

module.exports = {
	name: "help",
	description: "Information about the bot commands",
	aliases: ["mayday", "how", "plz"],
	cooldown: 5,

	execute(message, args) {
		if (!args[0] || !subCommands[args[0]]) {
			const helpPanel = new Discord.MessageEmbed({
				color: config.bot.color,
				title: "Help",
				description: "Here is the list of the bot commands:",
				thumbnail: {
					url: client.user.avatarURL()
				},
				fields: [
					{ name: "Commands", value: "`>help commands`", inline: true },
					{ name: "Moderation", value: "`>help moderation`", inline: true },
				]
			});

			message.reply({
				content: `Need some help <@${message.author.id}>? Here is everything you should know:`,
				embeds: [ helpPanel ]
			});
		}

		// sub commands
		if (subCommands[args[0]]) {
			let subCommand = subCommands[args[0]];
			subCommand.callback(message);
		}
	},
};