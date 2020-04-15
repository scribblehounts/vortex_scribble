const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const Discord = require('discord.js')

module.exports = {
  name: "rolldice",
  category: "fun",
  description: "To kick a member",
  run: async(client,message,args) => {
  try {

  let replies = ["1", "2", "3", "4", "5", "6", "Null"]

  let result = Math.floor((Math.random() * replies.length))

  let ballembed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag)
  .setColor("#000000")
  .addField("Your Dice number is...", replies[result])

  message.channel.send(ballembed);
    } catch(err) {
      message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)
    }
    }
}