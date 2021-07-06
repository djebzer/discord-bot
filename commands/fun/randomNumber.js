module.exports = {
	name: "number",
	description: "Generate a random number between 0 and your maximum",
	usage: "<number>",
	args: true,
	cooldown: 10,
	guildOnly: true,
	execute(message, args) {
		let number = parseInt(args[0]);
		message.reply(`Random number: **${Math.floor(Math.random() * number)}**`);
	},
};