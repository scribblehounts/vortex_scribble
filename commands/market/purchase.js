let Discord = require('discord.js');

module.exports = {
  name: "purchase",
  category: "market",
  description: "To purchase an item",
  run: async(client, message, args) => {
if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var product = args[1]
    if (product){
      
    } else {
      message.channel.send(new Discord.RichEmbed().setAuthor("Please enter a valid product,"))
    }
    }
  }