const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "avatar",
	description: i18n.__("modules.commands.cmds.avatar.command_desc"),
	cooldown: 30,
	guildOnly: true,
	execute(message) {
		let taggedUser = message.mentions.users.first();

		const avatarEmbed = new Discord.MessageEmbed({
			color: config.bot.color,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL()
			},
			image: {
				url: message.author.displayAvatarURL({ size: 2048, format: 'png', dynamic: true })
			},
			footer: {
				text: i18n.__mf("modules.commands.cmds.avatar.requested_by", { author_id: message.author.tag }),
				icon_url: message.author.avatarURL()
			}
		});

		if (!taggedUser) {
			return message.reply({
				content: i18n.__("modules.commands.cmds.avatar.answer_self"),
				embeds: [ avatarEmbed ]
			});
		}

		avatarEmbed
			.setAuthor(taggedUser.tag, taggedUser.avatarURL())
			.setImage(taggedUser.displayAvatarURL({ size: 2048, format: 'png', dynamic: true }))
			.setFooter(i18n.__mf("modules.commands.cmds.avatar.requested_by", { author_id: message.author.tag }), message.author.avatarURL())
		;

		return message.reply({
				content: i18n.__mf("modules.commands.cmds.avatar.answer_target", { target_tag: taggedUser.tag }),
				embeds: [ avatarEmbed ]
			});
	},
};