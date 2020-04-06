var Discord = require('discord.js')

module.exports = {
  name: "suggest",
  category: "moderation",
  description: "To request an 8ball",
  run: async(client,message,args) => {
    if (message.author.bot) return;
const channel = message.guild.channels.find(ch => ch.name === 'suggestions');  //finds the channel named suggestions 

var msg = channel.send(new Discord.RichEmbed() + args.join(' '))
msg.react("👍")
msg.react("👎")
  }
}