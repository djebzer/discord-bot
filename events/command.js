const client = require("../main");
const config = require("../config.json");
const { addLog } = require("../functions/logging");

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (!config.modules.commands) return;
		if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;

		const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		if (!client.commands.has(commandName)) return;
		const command = client.commands.get(commandName);

		if (command.args && !args.length) {
			return message.reply(`You didn't provide any arguments for this command!`);
		}

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}

		if (!config.logs.all) return;
		if (!config.logs.message_sent) return;
		
		addLog(message.author, {
			title: "Message sent",
			description: `<@${message.author.id}> says: ${message.content}`,
			footer: `AuthorID: ${message.author.id}, MessageID: ${message.id}`,
			timestamp: new Date()
		});
	}
}