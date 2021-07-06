const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (message.author.bot) return;
		if (!config.logs.disable_all && config.logs.message_sent) {
			addLog(message.author, {
				title: i18n.__("logs.message_sent.title"),
				description: i18n.__mf("logs.message_sent.description", {
					author_id: message.author.id,
					message_content: message.content
				}),
				footer: `AuthorID: ${message.author.id}, MessageID: ${message.id}`,
				timestamp: new Date()
			});
		}
	}
}