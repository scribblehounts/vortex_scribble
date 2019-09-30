const Discord = require("discord.js");

module.exports = {
  name: "send",
  category: "moderation",
  description: "To send an bot message",
  run: async(client, message, args) => {
if (message.author.bot) return;
    var message = message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription(`**React with the following emoji to start a ticket!**`))
message.react('👍').then(() => message.react('👎'));

const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
			message.reply('you reacted with a thumbs up.');
		} else {
			message.reply('you reacted with a thumbs down.');
		}
	})
	.catch(collected => {
		message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
	});
    
    
  }
}