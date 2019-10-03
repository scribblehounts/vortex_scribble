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
      if (real === "ally" || real === "developer"){
        var brand = real[0].toUpperCase() + real.slice(1); 
        message.reply("Please look in your DMs!")
        message.author.send(new Discord.RichEmbed().setAuthor(`${brand}`).setDescription("What is your RBLX username?").setFooter("Type #cancel to cancel").setColor("#2ecc71"))
        .then((newmsg) => {
          newmsg.channel.awaitMessages(response => response.content, {
            max:1,
           time: 50000,
            errors: ['time'],
            }).then((collected) => {
            newmsg.channel.send("${collected.first()}")
          })
        })
      }
    } else {
      message.channel.send(new Discord.RichEmbed().setAuthor("You must choose a rank,","https://i.imgur.com/UaHfuUX.png").setDescription("**Ally**\n**Developer** ").setFooter("Application System").setColor("#ff4757"));
    }
    }
  }