const config = require("../../config.json");
const client = require("../../main");
const Discord = require("discord.js");

client.on("interaction", (interaction) => {
	// >help commands
	if (interaction.customID == "commands_helpCommands") {
		interaction.reply({
			embeds: [
				{
					color: config.bot.color,
					title: "Available commands",
					description: "Here is a list of all available commands",
					fields: [
						{ name: "Commands", value: `• command1`}
					]
				}
			],
			ephemeral: true
		})
	}
});

module.exports = {
	name: 'help',
	description: 'Information about the bot',
	execute(message, args) {
		if (!args[0]) {
			const helpPanel = new Discord.MessageEmbed({
				color: config.bot.color,
				title: "Help",
				description: "Click on the buttons to get more information"
			});

			const commandsButton = new Discord.MessageButton({
				customID: "commands_helpCommands",
				label: "Commands",
				emoji: "⌨️",
				style: "SECONDARY",
				type: "BUTTON"
			});

			message.channel.send({ 
				content: `Need some help <@${message.author.id}>? Here is everything you should know:`,
				embeds: [ helpPanel ],
				components: [
					[ commandsButton ]
				]
			});
		}
	},
};