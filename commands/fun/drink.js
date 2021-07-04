const client = require("../../main");

module.exports = {
	name: 'drink',
	description: 'Ask for a random drink!',
	execute(message) {
		message.channel.send('Here is a drink for you!');
	},
};