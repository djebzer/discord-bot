const client = require("../main");
const config = require("../config.json");
const { addLog } = require("../functions/logging");
const { MessageButton } = require("discord.js");

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (!config.logs.all) return;
		if (!config.logs.message_sent) return;
		if (message.author.bot) return;
		
		addLog(message.author, {
			title: "Message sent",
			description: `<@${message.author.id}> says: ${message.content}`,
			footer: `AuthorID: ${message.author.id}, MessageID: ${message.id}`,
			timestamp: new Date()
		});
	}
}