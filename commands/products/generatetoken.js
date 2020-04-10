const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "generatetoken",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.some(role => role.name === 'Owner')){
  
  var username = message.mentions.members.first()
  
  if (!username){
        var docRef = db.collection("users").doc(args[1]);
    docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('promocodes').doc(`${args[1]}`).set({CODE: "RUBEUS_"},{CATEGORY: "REBEUS"},{merge: true});

            return message.channel.send(new Discord.RichEmbed().setTitle("Success!").setDescription("Your Rubeus Promo Code Is: ").setFooter("Product System").setColor("#2ecc71"))
      }

})
  }

        db.collection('users').where('discord','==',username.id).get().then(exist => {
        if (exist.empty){
          message.reply("user is not linked")
          return;
        }
          exist.forEach(doc => {
            roblox.getUsernameFromId(doc.id).then(function(username){
                db.collection('promocodes').doc(doc.id).set({CODE: "RUBEUS_"+username.toUpperCase()},{CATEGORY: "REBEUS"},{merge: true});
            })

            return message.channel.send(new Discord.RichEmbed().setTitle("Success!").setDescription("Your Rubeus Promo Code Is: ").setFooter("Product System").setColor("#2ecc71"))
          })
        })
  
}
  }   
    
}