const Discord = require("discord.js");

module.exports = {
  name: "send",
  category: "moderation",
  description: "To send an bot message",
  run: async(client, message, args) => {
if (msg.author.bot) return;
message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription(`**React with the following emoji to start a ticket!**`).setColor("#ff4757")))
            .then(function (message) {
              message.react("👍")
              message.react("👎")
              message.pin()
              message.delete()
            }).catch(function() {
              //Something
             });
  }
}