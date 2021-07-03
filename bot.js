// Modules
require("dotenv").config();
require("edit-dotenv");
require("discord-reply");
const pkgJSON = require("./package.json");
const config = require("./config.json")
const lang = require("./localization.json")
const discord = require("discord.js");

// Classes
const UserJoinGuildEmbed = require("./embed/UserJoinGuildEmbed");
const UserLeaveGuildEmbed = require("./embed/UserLeaveGuildEmbed");

// Initialize bot
const bot = new discord.Client();
bot.once("ready", () => {
	bot.user.setActivity("in Grove Street");
	console.log(`${pkgJSON.name} bot is ready! (Author: ${pkgJSON.author}, Version: ${pkgJSON.version})`);

	// Test events
	bot.channels.fetch(config.channels.general).then(channel => {
		channel.send("Hey guys, I just went online 😎");
	});

	setTimeout(() => {
		bot.emit("guildMemberAdd", bot.user);
		bot.emit("guildMemberRemove", bot.user);
	}, 1000);
})

// Commands
bot.on("message", message => {
	if (message.content.startsWith(config.prefix)) {
		message.lineReply("Hey bro, what do you need?");
		userJoinGuild(message.author);
	}
});

// Functions
async function getChannelById(id){
	return await Promise.resolve(
		bot.channels.fetch(id)
	);
}

// Events
async function userJoinGuild(user){
	getChannelById(config.channels.logs)
	.then(channel => {
		var messageEmbed = new UserJoinGuildEmbed(user);
		channel.send({ embed: messageEmbed }).then(embed => {
			embed.react("👋");
		});
		console.log(`(Info) ${user.tag} joined the server!`);
	});
}
bot.addListener("guildMemberAdd", userJoinGuild)

async function userLeftGuild(user){
	getChannelById(config.channels.logs)
	.then(channel => {
		var messageEmbed = new UserLeaveGuildEmbed(user);
		channel.send({ embed: messageEmbed }).then(embed => {
			embed.react("😢");
		});
		console.log(`(Info) ${user.tag} left the server..`);
	});
}
bot.addListener("guildMemberRemove", userLeftGuild)

bot.on("message", message => {
	if (message.content == "uptime")
		message.channel.send(`Bot has been running for ${bot.uptime} seconds.`);
});

// Bot login process
bot.login(process.env.BOT_TOKEN);