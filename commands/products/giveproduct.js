const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "giveproduct",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.some(role => role.name === 'Mod')) {
      var username = message.mentions.members.first()

        if (args[2] === ("ife")){
  var docRef = db.collection('users').where('discord','==',username.id).get().then(doc => {
    if (doc.exists) {
docRef.doc(`${username}`).set({ife: "owned"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been added!**`).setFooter("Product System").setColor("#2ecc71"))
      } else {
        message.channel.send(new Discord.RichEmbed().setTitle("Error").setDescription(`**${args[1]} Has been added!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        }
        
    
  }
  }
}
