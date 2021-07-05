const client = require("../main");
const config = require("../config.json");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "messageUpdate",
	execute(oldMessage, newMessage) {
		if (!config.logs.all) return;
		if (!config.logs.message_edited) return;
		
		let editor = newMessage.author;
		if (editor.bot) return;
		
		addLog(editor, {
			title: "Message edited",
			description: `<@${editor.id}> edited a message in ${oldMessage.channel}.`,
			fields: [
				{ name: "Before", value: oldMessage.content },
				{ name: "After", value: newMessage.content }
			],
			footer: `EditorID: ${editor.id}, MessageID: ${oldMessage.id}`,
			timestamp: new Date()
		});
	}
}