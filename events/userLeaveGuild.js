const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const config = require(`${projectPath}/config.json`);
const UserLeaveGuildEmbed = require(`${projectPath}/embeds/UserLeaveGuildEmbed`);
const { addLog } = require(`${projectPath}/functions/logging`);

module.exports = {
	name: "guildMemberRemove",
	execute(user) {
		// send an embed message in the lobby
		if (config.modules.user_left) {		
			client.channels.fetch(config.channels.lobby).then(channel => {
				channel.send({ embeds: [ new UserLeaveGuildEmbed(user) ] }).then(embed => {
					embed.react("😢");
				});
			});
		}

		// log
		if (!config.logs.disable_all && config.logs.user_joined) {
			addLog(user, {
				title: "User left",
				description: `<@${user.id}> left the server.`,
				footer: `UserID: ${user.id}`,
				timestamp: new Date()
			});
		}
	}
}