const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "blacklist",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.cache.some(role => role.name === 'Founders')){
  try{
  var username = message.mentions.members.first()
  
  if (!username){
        var docRef = db.collection("users").doc(args[1]);
    docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${args[1]}`).set({blacklisted: "by: "+ message.author.id + " alias: " + message.author.tag},{merge: true});

            return message.channel.send(new Discord.MessageEmbed().setTitle("Blacklisted").setDescription(`**BLACKLISTED** `  + args[1]).setFooter("Product System").setColor("#2ecc71"))
      }

})
  }

        db.collection('users').where('discord','==',username.id).get().then(exist => {
        if (exist.empty){
          message.reply("user is not linked")
          return;
        }
          exist.forEach(doc => {
                db.collection('users').doc(doc.id).set({blacklisted: "by: "+ message.author.id + " alias: " + message.author.tag},{merge: true});

            return message.channel.send(new Discord.MessageEmbed().setTitle("Blacklisted").setDescription(`**BLACKLISTED** `  + args[1]).setFooter("Product System").setColor("#2ecc71"))
          })
        })
  
} 
catch(err) {
  message.reply(err)
}
  } 
}
}