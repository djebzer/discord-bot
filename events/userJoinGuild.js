const client = require("../main");
const config = require("../config.json");
const UserJoinGuildEmbed = require("../embeds/UserJoinGuildEmbed");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "guildMemberAdd",
	execute(user) {
		// send an embed message in the lobby
		if (config.modules.user_joined) {
			client.channels.fetch(config.channels.lobby).then(channel => {
				channel.send({ embed: new UserJoinGuildEmbed(user) }).then(embed => {
					embed.react("👋");
				});
			});
		}

		// log
		if (config.logs.all && config.logs.user_joined) {
			addLog(user, {
				title: "User joined",
				description: `<@${user.id}> joined the server.`,
				footer: `UserID: ${user.id}`,
				timestamp: new Date()
			});
		}
	}
}