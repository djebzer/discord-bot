const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const pkgJSON = require(`${projectPath}/package.json`);
const config = require(`${projectPath}/config.json`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "ready",
	once: true,
	execute() {
		console.log(`(Info) ${pkgJSON.name} is ready! (Author: ${pkgJSON.author}, Version: ${pkgJSON.version})`);

		// set the bot activity
		client.user.setActivity("in Grove Street");

		/*function updateGuildsCount(){
			let guildsCount = `${client.guilds.cache.size} server`;
			guildsCount += (guildsCount > 1) ? "s" : "";
			client.user.setActivity(`in ${guildsCount}. (${config.bot.prefix}help)`);
		}

		if (config.bot.activity) {
			updateGuildsCount();

			// update it every 10 minutes
			setInterval(() => {
				updateGuildsCount();
			}, 600000);
		}*/
	}
}