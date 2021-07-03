require("dotenv").config();
const editDotEnv = require("edit-dotenv");
const pkgJSON = require("./package.json");
const discord = require("discord.js");
require("discord-reply");
const bot = new discord.Client();

// Settings
var botLang = process.env.BOT_LANGUAGE;
var botPrefix = process.env.BOT_PREFIX;
var logsChannel;
var generalChannel;

bot.once("ready", () => {
	// Initialize bot
	bot.user.setActivity("in Grove Street");
	console.log(`${pkgJSON.name} bot is ready! (Author: ${pkgJSON.author}, Version: ${pkgJSON.version})`);

	// Initialize channels
	// #logs
	bot.channels.fetch(process.env.BOT_CHANNEL_LOGS)
	.then(channel => {
		logsChannel = channel;
		console.log(`${logsChannel.name} channel initialized.`);
	});

	// #general
	bot.channels.fetch(process.env.BOT_CHANNEL_GENERAL)
	.then(channel => {
		generalChannel = channel;
		console.log(`${generalChannel.name} channel initialized.`);
		generalChannel.send("Hello guys, I just went online 😎");
	});

	setTimeout(() => {
		bot.emit("guildMemberAdd", bot.user);
		bot.emit("guildMemberRemove", bot.user);
	}, 1000);
})

// Commands
bot.on("message", message => {
	if (message.content.startsWith(botPrefix)) {
		message.lineReply("Hey bro, what do you need?");
		userJoinServer(message.author);
	}
});

// Embed message template
class UserGuildInteractionEmbed {
	constructor(target, type) {
		if (!target) return;
		var color;
		var title;
		var description;
		var fields;

		if (type == "joined") {
			color = "#30D158";
			title = "Member joined";
			description = `Welcome to <@${target.id}>, he just joined the server!`;
			fields = [
				{ name: "Information", value: `
					• General channel: <#${generalChannel.id}>
					• Logs channel: <#${logsChannel.id}>
				` }
			]
		} else if (type == "left") {
			color = "#FF453A";
			title = "Member left";
			description = `Good bye to <@${target.id}>, he just left the server..\nWe hope to see you coming back soon!`;
		}
		return {
			color: color,
			title: title,
			description: description,
			thumbnail: {
				url: target.avatarURL()
			},
			fields: fields,
			footer: {
				text: target.username,
				icon_url: target.avatarURL()
			},
			timestamp: new Date(),
		}
	}
}

async function userJoinServer(user){
	if (logsChannel)
		var messageEmbed = new UserGuildInteractionEmbed(user, "joined");
		logsChannel.send({ embed: messageEmbed }).then(embed => {
			embed.react("👋");
		});
		console.log(`(Info) ${user.tag} joined the server!`);
}
bot.addListener("guildMemberAdd", userJoinServer)

async function userLeftServer(user){
	if (logsChannel)
		var messageEmbed = new UserGuildInteractionEmbed(user, "left");
		logsChannel.send({ embed: messageEmbed }).then(embed => {
			embed.react("😢");
		});
		console.log(`(Info) ${user.tag} left the server..`);
}
bot.addListener("guildMemberRemove", userLeftServer)

// Functions
bot.on("message", message => {
	if (message.content == "uptime")
		message.channel.send(`Bot has been running for ${bot.uptime} seconds.`);
});

bot.login(process.env.BOT_TOKEN);