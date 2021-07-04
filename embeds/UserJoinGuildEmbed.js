const config = require("../config.json");
module.exports = class UserJoinGuildEmbed {
	constructor(target) {
		if (!target) return;

		var color = "#30D158";
		var title = "Member joined";
		var description = `Welcome to <@${target.id}>, who just joined the server!`;
		var fields = [
			{ name: "Information", value: `
				• General channel: <#${config.channels.general}>
				• Logs channel: <#${config.channels.logs}>
			` }
		]

		return {
			color: color,
			title: title,
			description: description,
			thumbnail: {
				url: target.avatarURL()
			},
			fields: fields,
			footer: {
				text: target.username,
				icon_url: target.avatarURL()
			},
			timestamp: new Date(),
		}
	}
}