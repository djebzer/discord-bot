const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);

module.exports = {
	name: "messageUpdate",
	execute(oldMessage, newMessage) {		
		let editor = newMessage.author;
		if (editor.bot) return;
		if (!config.logs.disable_all && config.logs.message_edited) {
			addLog(editor, {
				title: "Message edited",
				description: `<@${editor.id}> edited a message in <#${oldMessage.channel.id}>.`,
				fields: [
					{ name: "Before", value: oldMessage.content },
					{ name: "After", value: newMessage.content }
				],
				footer: `EditorID: ${editor.id}, MessageID: ${oldMessage.id}`,
				timestamp: new Date()
			});
		}
	}
}