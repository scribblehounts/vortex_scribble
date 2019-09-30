const Discord = require("discord.js");

module.exports = {
  name: "send",
  category: "moderation",
  description: "To send an bot message",
  run: async(client, message, args) => {
if (message.author.bot) return;
    
    const filter = (reaction, user) => {
    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};
    
    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription(`**React with the following emoji to start a ticket!**`).setColor("#ff4757"))
      .then(function (message) {
        message.react("✅")
        
        
      })
    })
    

  }
}