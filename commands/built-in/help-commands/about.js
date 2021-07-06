const projectPath = process.cwd();
const pkgJSON = require(`${projectPath}/package.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");

module.exports = {
	name: "about",
	title: "About",
	description: "Information about the bot author",
	callback(message) {
		client.users.fetch(pkgJSON.author_discord_id).then(botAuthor => {
			const aboutEmbed = new Discord.MessageEmbed ({
				color: "#FF453A",
				title: "Bot author information",
				description: this.description,
				fields: [
					{ name: "Author", value: `${botAuthor.tag}` },
					{ name: "About him", value: "Click on the buttons below for useful links." }
				],
				thumbnail: {
					url: botAuthor.avatarURL()
				},
				footer: {
					text: botAuthor.tag,
					icon_url: botAuthor.avatarURL()
				}
			});
			const websiteButton = new Discord.MessageButton({
				url: "http://djebzer.fr",
				label: "Website",
				emoji: "🌐",
				style: "LINK",
			});
			const githubButton = new Discord.MessageButton({
				url: "https://github.com/djebzer",
				label: "GitHub",
				emoji: "🐙",
				style: "LINK",
			});

			return message.reply({
				content: `Here are information about the dude who created me! 😎`,
				embeds: [ aboutEmbed ],
				components: [[ websiteButton, githubButton ]]
			});
		});
	}
}