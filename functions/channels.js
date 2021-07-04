const client = require("../main");

async function getChannelById(id){
	if (!client) return false;
	return await Promise.resolve(
		client.channels.fetch(id)
	);
}

module.exports.getChannelById = getChannelById;