const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "giveproduct",
  category: "moderation",
  description: "To give a product to another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.some(role => role.name === 'Mod')) {
      var tokenID = message.mentions.users.first().id.replace('<@', '').replace('>', '').replace('!', '');
      var chosenName = message.guild.members.get(tokenID);
      if (tokenID){

          let ref = db.collection('users');
        let queryRef = (ref.where('tokenID', '==', `${tokenID}`));
        console.log(queryRef)
            //chosenName.addRole(message.guild.roles.find(role => role.name === `${args[2]}`));
            //message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been successfully given **` + `${args[2]}`).setFooter("Verification").setColor("#2ecc71"))
            //db.collection('users').doc(`${tokenID}`).set({tokenID},{merge: true});

      } else {
        message.channel.send(new Discord.RichEmbed().setTitle("Error").setDescription(`**You must have the persons discord!.**`).setFooter("Verification").setColor("#ff4757"))
      }
    } else {
      message.reply("you dont have sufficient permissions")
    }
  }
}