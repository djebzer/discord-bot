const client = require("../../main");

let drinksList = [
	{ name: "Champagne", emoji: "🥂" },
	{ name: "Wine", emoji: "🍷" },
	{ name: "Whisky", emoji: "🥃" },
	{ name: "Milk", emoji: "🥛" },
];

module.exports = {
	name: "drink",
	description: "Ask for a random drink!",
	guildOnly: true,
	
	execute(message) {
		let randomDrink = drinksList[Math.floor(Math.random() * drinksList.length)];
		message.channel.send(`Here is a **${randomDrink.name} ${randomDrink.emoji}** for you!`);
	},
};

// interactions
client.on("interactionCreate", (interaction) => {
	if (interaction.customID == "randomDrink") {
		let drink = drinksList[Math.floor(Math.random() * drinksList.length)]
		interaction.reply({ content: `You received a **${drink.name} ${drink.emoji}**!`, ephemeral: true })
			.catch(console.error)
		;
	}
})