const projectPath = process.cwd();
const pkgJSON = require(`${projectPath}/package.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "about",
	title: i18n.__("modules.commands.cmds.help.sub_commands.about.command_title"),
	description: i18n.__("modules.commands.cmds.help.sub_commands.about.command_desc"),
	callback(message) {
		client.users.fetch(pkgJSON.author_discord_id).then(botAuthor => {
			const aboutEmbed = new Discord.MessageEmbed ({
				color: "#FF453A",
				title: i18n.__("modules.commands.cmds.help.sub_commands.about.embed_title"),
				description: this.description,
				fields: [
					{ name: i18n.__("modules.commands.cmds.help.sub_commands.about.embed_field_author_name"), value: `${botAuthor.tag}` },
					{
						name: i18n.__("modules.commands.cmds.help.sub_commands.about.embed_field_info_name"),
						value: i18n.__("modules.commands.cmds.help.sub_commands.about.embed_field_info_value")
					}
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
				label: i18n.__("modules.commands.cmds.help.sub_commands.about.link_website"),
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
				content: i18n.__("modules.commands.cmds.help.sub_commands.about.message"),
				embeds: [ aboutEmbed ],
				components: [[ websiteButton, githubButton ]]
			});
		});
	}
}