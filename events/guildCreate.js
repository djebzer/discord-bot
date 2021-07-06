const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const pkgJSON = require(`${projectPath}/package.json`);
const config = require(`${projectPath}/config.json`);
const { getDefaultChannel } = require(`${projectPath}/functions/channels`);

module.exports = {
	name: "guildCreate",
	execute(guild) {
		// send a little message in the default channel when the bot joined the guild
		const channel = getDefaultChannel(guild);
		channel.send(`👋`);
	}
}