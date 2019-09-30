const Discord = require("discord.js");

module.exports = {
  name: "support",
  category: "moderation",
  description: "To request support",
  run: async(client, message, args) => {
if (message.author.bot) return;
    var fakemessage = message.channel.send("support")
message.react('✅').then();

const filter = (reaction, user) => {
	return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
};

fakemessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
			message.reply('Check your DMs!')
		}
	})
	.catch(collected => {
		message.reply('Support ran out of time.');
	});
  }
}