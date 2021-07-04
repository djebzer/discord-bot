const client = require("../main");
const pkgJSON = require("../package.json");
const config = require("../config.json");

module.exports = {
	name: "ready",
	once: true,
	execute() {
		console.log(`(Info) ${pkgJSON.name} bot is ready! (Author: ${pkgJSON.author}, Version: ${pkgJSON.version})`);

		// set the bot activity
		if (config.bot.activity) {
			client.user.setActivity(config.bot.activity);
		}

		// Testing events
		/*client.channels.fetch(config.channels.general).then(channel => {
			channel.send("Hey guys, I just went online 😎");
		});
		setTimeout(() => {
			client.emit("guildMemberAdd", client.user);
			client.emit("guildMemberRemove", client.user);
		}, 1000);*/
	}
}