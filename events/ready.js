const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const pkgJSON = require(`${projectPath}/package.json`);
const config = require(`${projectPath}/config.json`);

module.exports = {
	name: "ready",
	once: true,
	execute() {
		console.log(`(Info) ${pkgJSON.name} is ready! (Author: ${pkgJSON.author}, Version: ${pkgJSON.version})`);

		// set the bot activity
		function updateGuildsCount(){
			let guildsCount = `${client.guilds.cache.size} server`;
			guildsCount += (guildsCount > 1) ? "s" : "";
			client.user.setActivity(`on ${guildsCount}. (${config.bot.prefix}help)`);
		}

		if (config.bot.activity) {
			updateGuildsCount();

			// update it every 2 minutes
			setInterval(() => {
				updateGuildsCount();
			}, 120000);
		}

		// testing events
		setTimeout(() => {
			client.emit("guildMemberAdd", client.user);
			client.emit("guildMemberRemove", client.user);
		}, 1000);
	}
}