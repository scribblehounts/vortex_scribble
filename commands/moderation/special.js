const Discord = require("discord.js");

module.exports = {
  name: "special",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
      message.channel.send(new Discord.MessageEmbed().setImage("https://imgur.com/WteCcZO.png").setColor("#4d91ff"))
      
    }
}