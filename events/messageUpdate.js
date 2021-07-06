const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	name: "messageUpdate",
	execute(oldMessage, newMessage) {		
		let editor = newMessage.author;
		if (editor.bot) return;
		if (!config.logs.disable_all && config.logs.message_edited) {
			addLog(editor, {
				title: i18n.__("logs.message_edited.title"),
				description: i18n.__mf("logs.message_edited.description", {
					editor_id: editor.id,
					channel_id: oldMessage.channel.id
				}),
				fields: [
					{ name: i18n.__("logs.message_edited.before"), value: oldMessage.content },
					{ name: i18n.__("logs.message_edited.after"), value: newMessage.content }
				],
				footer: `EditorID: ${editor.id}, MessageID: ${oldMessage.id}`,
				timestamp: new Date()
			});
		}
	}
}