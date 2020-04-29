const Discord = require("discord.js");
const Canvas = require('canvas');

module.exports = {
  name: "image",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {
    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")

  }
}