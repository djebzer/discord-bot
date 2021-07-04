const client = require("../../main");

var drinksList = [
	{ name: "Champagne", emoji: "🥂" },
	{ name: "Wine", emoji: "🍷" },
	{ name: "Whisky", emoji: "🥃" },
	{ name: "Milk", emoji: "🥛" },
];

client.on("interactionCreate", (interaction) => {
	if (interaction.customID == "randomDrink") {
		var drink = drinksList[Math.floor(Math.random() * drinksList.length)]
		interaction.reply({ content: `You received a **${drink.name} ${drink.emoji}**!`, ephemeral: true })
			.catch(console.error)
		;
	}
})

module.exports = {
	name: 'drink',
	description: 'Ask for a random drink!',
	execute(message) {
		message.channel.send('Here is a drink for you!');
	},
};