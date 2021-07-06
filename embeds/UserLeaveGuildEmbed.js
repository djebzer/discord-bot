const projectPath = process.cwd();
const { i18n } = require(`${projectPath}/main`);

module.exports = class UserLeaveGuildEmbed {
	constructor(target) {
		if (!target) return;
		return {
			color: "#FF453A",
			title: i18n.__("modules.user_left.title"),
			description: i18n.__mf("modules.user_left.description", { target_id: target.id }),
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