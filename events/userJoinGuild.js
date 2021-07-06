const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const config = require(`${projectPath}/config.json`);
const UserJoinGuildEmbed = require(`${projectPath}/embeds/UserJoinGuildEmbed`);
const { addLog } = require(`${projectPath}/functions/logging`);
const { i18n } = require(`${projectPath}/main`);

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
				title: i18n.__("logs.user_joined.title"),
				description: i18n.__mf("logs.user_joined.description", { user_id: user.id }),
				footer: `UserID: ${user.id}`,
				timestamp: new Date()
			});
		}
	}
}