const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const client = require(`${projectPath}/main`);
const { addLog } = require("../../functions/logging");

module.exports = {
	disabled: true,
	moderation: true,
	name: "kick",
	description: "Kicks a specified user",
	usage: ["<user>"],
	args: true,
	permissions: "KICK_MEMBERS",
	guildOnly: true,
	execute(message) {
		// kicks an user from the server
		let taggedUser = message.mentions.users.first();
		if (!taggedUser) {
			return message.reply(`Couldn't find the specified user! (Example: ${config.bot.prefix}kick <@${client.user.id}>)`);
		}

		// check if the tagger user is the author
		if (taggedUser === message.author) {
			return message.reply(`You can't kick yourself! 🤦`);
		}

		// check if the tagged user is the server owner
		if (taggedUser.id === message.guild.ownerID) {
			return message.reply(`You can't kick the server owner! 💀`);
		}

		if (!config.logs.disable_all && config.logs.user_kicked) {
			addLog(taggedUser, {
				title: "User kicked",
				description: `<@${taggedUser.id}> has been kicked from the server by <@${message.author.id}>.`,
				footer: `UserID: ${taggedUser.id}, KickerID: ${message.author.id}`,
				timestamp: new Date()
			});
		}

		return message.reply(`You want to kick ${taggedUser.username}`);
	},
};