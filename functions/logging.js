var DEV_MODE = true

const client = require("../main");
const config = require("../config.json");
const LogsEmbed = require("../embeds/LogsEmbed");

module.exports.addLog = function addLog(target, info){
	if (DEV_MODE) {
		console.log(`(Logs) ${info.title}: ${info.description}`);
	}
	
	// create an embed box and send it
	client.channels.fetch(config.channels.logs).then(channel => {
		channel.send({ embed: new LogsEmbed(target, info) });
	});
}