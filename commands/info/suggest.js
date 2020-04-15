var Discord = require('discord.js')

module.exports = {
  name: "suggest",
  category: "moderation",
  description: "To request an 8ball",
  run: async(client,message,args) => {
    if (message.author.bot) return;
const channel = message.guild.channels.cache.find(ch => ch.name === 'suggestions');  //finds the channel named suggestions 

var msg = channel.send(new Discord.MessageEmbed().setTitle("Suggestion by " + message.author.tag).setColor("#f9ae00").setDescription(args.join(' '))).then(function(message){
message.react("❌")
  message.react("✅")
})
  }
}