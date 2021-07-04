const client = require("../main");
const config = require("../config.json");
const UserLeaveGuildEmbed = require("../embeds/UserLeaveGuildEmbed");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "guildMemberRemove",
	execute(user) {
		// send an embed message in the lobby
		if (config.modules.user_left) {		
			client.channels.fetch(config.channels.lobby).then(channel => {
				channel.send({ embed: new UserLeaveGuildEmbed(user) }).then(embed => {
					embed.react("😢");
				});
			});
		}

		// log
		if (config.logs.all && config.logs.user_joined) {
			addLog(user, {
				title: "User left",
				description: `<@${user.id}> left the server.`,
				footer: `UserID: ${user.id}`,
				timestamp: new Date()
			});
			}
	}
}