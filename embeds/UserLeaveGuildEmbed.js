module.exports = class UserLeaveGuildEmbed {
	constructor(target) {
		if (!target) return;
		return {
			color: "#FF453A",
			title: "Member left",
			description: `
				Good bye to <@${target.id}>, who just left the server..
				We hope to see you coming back soon!
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