const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const config = require(`${projectPath}/config.json`);
const UserJoinGuildEmbed = require(`${projectPath}/embeds/UserJoinGuildEmbed`);
const { addLog } = require(`${projectPath}/functions/logging`);

module.exports = {
	name: "guildMemberAdd",
	execute(user) {
		// send an embed message in the lobby
		if (config.modules.user_joined) {
			client.channels.fetch(config.channels.lobby).then(channel => {
				channel.send({ embeds: [ new UserJoinGuildEmbed(user) ] }).then(embed => {
					embed.react("👋");
				});
			});
		}

		// log
		if (!config.logs.disable_all && config.logs.user_joined) {
			addLog(user, {
				title: "User joined",
				description: `<@${user.id}> joined the server.`,
				footer: `UserID: ${user.id}`,
				timestamp: new Date()
			});
		}
	}
}