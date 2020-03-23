const Discord = require("discord.js");

module.exports = {
  name: "special",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
  

let role = message.guild.roles.find(r => r.name == 'Customer')

if (!role) return message.channel.send(`**${message.author.username}**, role not found`)

message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role))
message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`)

    }
}