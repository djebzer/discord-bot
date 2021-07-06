const projectPath = process.cwd();
const { i18n } = require(`${projectPath}/main`);

module.exports = class UserJoinGuildEmbed {
	constructor(target) {
		if (!target) return;
		return {
			color: "#30D158",
			title: i18n.__("modules.user_joined.title"),
			description: i18n.__mf("modules.user_joined.description", { target_id: target.id }),
			thumbnail: {
				url: target.avatarURL()
			},
			footer: {
				text: target.username,
				icon_url: target.avatarURL()
			},
			timestamp: new Date(),
		}
	}
}