module.exports = class UserJoinGuildEmbed {
	constructor(target) {
		if (!target) return;
		return {
			color: "#30D158",
			title: "Member joined",
			description: `
				Welcome to <@${target.id}>, who just joined the server!
				Enjoy your stay there!
			`,
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