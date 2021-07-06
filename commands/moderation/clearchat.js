const projectPath = process.cwd();
const config = require(`${projectPath}/config.json`);
const { addLog } = require(`${projectPath}/functions/logging`);
const { i18n } = require(`${projectPath}/main`);

module.exports = {
	moderation: true,
	name: "clearchat",
	description: i18n.__("modules.commands.cmds.clearchat.command_desc"),
	usage: ["[channel]"],
	cooldown: 1, //60
	permissions: "MANAGE_MESSAGES",
	guildOnly: true,
	execute(message) {
		// clear a specified channel
		let mentionnedChannel = message.mentions.channels.first();
		if (mentionnedChannel) {
			return mentionnedChannel.bulkDelete(100).then(() => {
				mentionnedChannel.send(i18n.__mf("modules.commands.cmds.clearchat.answer", { author_id: message.author.id }));
				if (!config.logs.disable_all && config.logs.chat_cleared) {
					addLog(message.author, {
						title: i18n.__("logs.chat_cleared.title"),
						description: i18n.__mf("logs.chat_cleared.description", {
							channel_id: mentionnedChannel.id,
							author_id: message.author.id
						}),
						footer: `UserID: ${message.author.id}, ChannelID: ${mentionnedChannel.id}`,
						timestamp: new Date()
					});
				}
			});
		}

		// clear the actual channel
		return message.channel.bulkDelete(100).then(() => {
			message.channel.send(i18n.__mf("modules.commands.cmds.clearchat.answer", { author_id: message.author.id }));
			if (!config.logs.disable_all && config.logs.chat_cleared) {
				addLog(message.author, {
					title: i18n.__("logs.chat_cleared.title"),
					description: i18n.__mf("logs.chat_cleared.description", {
						channel_id: message.channel.id,
						author_id: message.author.id
					}),
					footer: `UserID: ${message.author.id}, ChannelID: ${message.channel.id}`,
					timestamp: new Date()
				});
			}
		});
	},
};