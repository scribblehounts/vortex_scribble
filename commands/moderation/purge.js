const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "purge",
  category: "moderation",
  description: "To purge messages",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.some(role => role.name === 'Mod')) {
      if (args[1] > 100) return message.channel.send(`**Please send a number less than 100**`);
      
      message.channel.bulkDelete(args[1])
    }
  }
}