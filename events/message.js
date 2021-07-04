const client = require("../main");
const config = require("../config.json");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "message",
	execute(message) {
		if (!config.logs.all) return;
		if (!config.logs.message_sent) return;
		if (message.author == client.user) return;
		
		addLog(message.author, {
			title: "Message sent",
			description: `<@${message.author.id}> says: ${message.content}`,
			footer: `AuthorID: ${message.author.id}, MessageID: ${message.id}`,
			timestamp: new Date()
		});
	}
}