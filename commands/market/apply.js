let Discord = require('discord.js');

module.exports = {
  name: "apply",
  category: "market",
  description: "To apply for a role",
  run: async(client, message, args) => {
if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var product = args[1]
    if (product){
        var real = product.toLowerCase();
      if (real === "ally"){
        message.reply("Please look in your DMs!")
        message.author.send(new Discord.RichEmbed().setAuthor(`${real}`,"https://i.imgur.com/UaHfuUX.png").setFooter("Any complaints,suggestions please contact Scribble#1771").setColor("#2ecc71"))
        message.author.send("https://www.roblox.com/catalog/4020813989/veroPlus")
      }
    } else {
      message.channel.send(new Discord.RichEmbed().setAuthor("You must choose a rank,","https://i.imgur.com/UaHfuUX.png").setDescription("**Ally**\n**Developer** ").setFooter("Application System").setColor("#ff4757"));
    }
    }
  }