const projectPath = process.cwd();
const client = require(`${projectPath}/main`);
const { i18n } = require(`${projectPath}/main`);

let drinksList = [
	{ name: "Champagne", emoji: "🥂" },
	{ name: "Wine", emoji: "🍷" },
	{ name: "Whisky", emoji: "🥃" },
	{ name: "Milk", emoji: "🥛" },
];

module.exports = {
	name: "drink",
	description: i18n.__("modules.commands.cmds.drink.command_desc"),
	cooldown: 10,
	guildOnly: true,
	execute(message) {
		let randomDrink = drinksList[Math.floor(Math.random() * drinksList.length)];
		message.reply(i18n.__mf("modules.commands.cmds.drink.answer", { drink: `${randomDrink.name} ${randomDrink.emoji}` }));
	},
};