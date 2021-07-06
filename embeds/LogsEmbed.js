module.exports = class LogsEmbed {
	constructor(target, info) {
		if (!target) return;
		return {
			color: "#7289DA",
			title: info.title,
			description: info.description,
			author: {
				name: target.tag,
				icon_url: target.avatarURL()
			},
			thumbnail: {
				//url: "../assets/logging.png"
				url: "https://i.imgur.com/BCZ3poe.png"
			},
			fields: info.fields || null,
			footer: {
				text: info.footer,
			},
			timestamp: info.timestamp,
		}
	}
}