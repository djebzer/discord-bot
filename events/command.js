const config = require("../config.json");
const Discord = require("discord.js");
const client = require("../main");
const cooldowns = client.cooldowns;
const { addLog } = require("../functions/logging");

module.exports = {
	name: "messageCreate",
	execute(message) {
		if (!config.modules.commands) return;
		if (!message.content.startsWith(config.bot.prefix) || message.author.bot) return;

		const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();

		// check if the command exists
		const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (!command) return;

		// check if the command is only for guilds
		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply("I can't execute that command inside DMs!");
		}

		// if arguments are required, then check for it
		if (command.args && !args.length) {
			let reply = `You didn't provide any argument for this command!`;
			if (command.usage) {
				reply += `\nThe proper usage for this command would be: \`${config.bot.prefix + command.name} ${command.usage}\``;
			}
			return message.reply(reply);
		}

		// check if the user is on cooldown
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldown = (command.cooldown || 3) * 1000;
		if (timestamps.has(message.author.id)) {
			const expiration = timestamps.get(message.author.id) + cooldown;
			if (now < expiration) {
				const timeLeft = (expiration - now) / 1000;
				return message.reply(`You need to wait **${timeLeft.toFixed(1)} second(s)** before using the \`${config.bot.prefix + command.name}\` command again!`);
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => { timestamps.delete(message.author.id) }, cooldown);

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