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
      message.channel.send(new Discord.RichEmbed().setAuthor("Please enter a valid product,","https://i.imgur.com/UaHfuUX.png").setDescription("**veroPlus** | 200R$ ").setFooter("Purchase System").setColor("#ff4757"));
    }
    }
  }