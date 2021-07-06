const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const config = require(`${projectPath}/config.json`);
const LogsEmbed = require(`${projectPath}/embeds/LogsEmbed`);

let DEV_MODE = config.dev_mode;

function addLog(target, info){
	// create an embed box and send it
	client.channels.fetch(config.channels.logs).then(channel => {
		channel.send({ embeds: [ new LogsEmbed(target, info) ] });
	});
	
	// log it in the console aswell if dev mode is enabled
	if (DEV_MODE) {
		console.log(`(Logs) ${info.title}: ${info.description}`);
	}
}
module.exports.addLog = addLog;