const Discord = require("discord.js");
const moment = require('moment')
var numDaysBetween = function(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

module.exports = {
  name: "special",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    var a1 = moment(message.author.createdAt).format("YYYY-MM-DD")
    var a2 = moment(Date.now()).format('YYYY-MM-DD')

    var d1 = new Date(a1)
    var d2 = new Date(a2)
    var daysbetween = numDaysBetween(d1, d2);
  }
}