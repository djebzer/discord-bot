module.exports = class UserLeaveGuildEmbed {
	constructor(target) {
		if (!target) return;

		var color = "#FF453A";
		var title = "Member left";
		var description = `
			Good bye to <@${target.id}>, who just left the server..
			We hope to see you coming back soon!
		`;

		return {
			color: color,
			title: title,
			description: description,
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