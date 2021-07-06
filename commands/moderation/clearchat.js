const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);

module.exports = {
	moderation: true,
	name: "clearchat",
	description: "Clears 100 messages from the actual or specified channel",
	usage: ["[channel]"],
	cooldown: 1,
	permissions: "MANAGE_MESSAGES",
	guildOnly: true,
	execute(message) {
		// clear a specified channel
		let mentionnedChannel = message.mentions.channels.first();
		if (mentionnedChannel) {
			return mentionnedChannel.bulkDelete(100).then(() => {
				message.channel.send(`Successfully deleted **100 messages** from <#${mentionnedChannel.id}>, <@${message.author.id}>!`);
				if (!config.logs.disable_all && config.logs.chat_cleared) {
					addLog(message.author, {
						title: "Chat cleared",
						description: `<#${mentionnedChannel.id}> has been cleared by <@${message.author.id}>.`,
						footer: `UserID: ${message.author.id}, ChannelID: ${mentionnedChannel.id}`,
						timestamp: new Date()
					});
				}
			});
		}

		// clear the actual channel
		return message.channel.bulkDelete(100).then(() => {
			message.channel.send(`Successfully deleted **100 messages** from <#${message.channel.id}>, <@${message.author.id}>!`);
			if (!config.logs.disable_all && config.logs.chat_cleared) {
				addLog(message.author, {
					title: "Chat cleared",
					description: `<#${message.channel.id}> has been cleared by <@${message.author.id}>.`,
					footer: `UserID: ${message.author.id}, ChannelID: ${message.channel.id}`,
					timestamp: new Date()
				});
			}
		});
	},
};