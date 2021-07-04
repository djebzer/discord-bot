const client = require("../../main");

module.exports = {
	name: 'number',
	description: 'Generate a random number between 0 and your maximum',
	args: true,
	execute(message, args) {
		var number = parseInt(args[0]);
		message.reply(`Random number: **${Math.floor(Math.random() * number)}**`);
	},
};