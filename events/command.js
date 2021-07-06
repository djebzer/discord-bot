const projectPath = process.cwd();
const prettyMS = require("pretty-ms");
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const Discord = require("discord.js");
const cooldowns = client.cooldowns;
const { addLog } = require(`${projectPath}/functions/logging`);
const { i18n } = require(`${projectPath}/main`);

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
			return message.reply(i18n.__("modules.commands.global.no_dm"));
		}

		// check if the command needs specific permissions
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply(i18n.__("modules.commands.global.no_permissions"));
			}
		}

		// if arguments are required, then check for it
		if (command.args && !args.length) {
			let reply = i18n.__("modules.commands.global.no_args");
			if (command.usage) {
				reply += `\n${i18n.__mf("modules.commands.global.usage", {
					command_name: config.bot.prefix + command.name,
					command_usage: command.usage
				})}`;
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
				const timeLeft = (expiration - now);
				return message.reply(i18n.__mf("modules.commands.global.time_left", {
					time_left: prettyMS(timeLeft),
					command_name: config.bot.prefix + command.name
				}));
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => { timestamps.delete(message.author.id) }, cooldown);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply(i18n.__("modules.commands.global.error"));
		}

		if (!config.logs.disable_all && config.logs.command_used) {
			addLog(message.author, {
				title: i18n.__("logs.command_used.title"),
				description: i18n.__mf("logs.command_used.description", {
					author_id: message.author.id,
					command_name: config.bot.prefix + command.name
				}),
				footer: `UserID: ${message.author.id}`,
				timestamp: new Date()
			});
		}
		
	}
}