const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (message.author.bot) return;
		if (!config.logs.disable_all && config.logs.message_sent) {
			addLog(message.author, {
				title: "Message sent",
				description: `<@${message.author.id}> says: ${message.content}`,
				footer: `AuthorID: ${message.author.id}, MessageID: ${message.id}`,
				timestamp: new Date()
			});
		}
	}
}