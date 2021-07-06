const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const pkgJSON = require(`${projectPath}/package.json`);
const config = require(`${projectPath}/config.json`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "ready",
	once: true,
	execute() {
		client.channels.fetch(config.channels.lobby).then(channel => {
			channel.send(i18n.__("global.hello"));
			channel.send(i18n.__mf("global.hello_formated", { test: 150 }));
		});

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