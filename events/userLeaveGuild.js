const client = require("../main");
const config = require("../config.json");
const UserLeaveGuildEmbed = require("../embeds/UserLeaveGuildEmbed");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "guildMemberRemove",
	execute(user) {
		if (!config.logs.all) return;
		if (!config.logs.user_left) return;
		
		client.channels.fetch(config.channels.lobby).then(channel => {
			channel.send({ embed: new UserLeaveGuildEmbed(user) }).then(embed => {
				embed.react("😢");
			});
		});

		addLog(user, {
			title: "User left",
			description: `<@${user.id}> left the server.`,
			footer: `UserID: ${user.id}`,
			timestamp: new Date()
		});
	}
}