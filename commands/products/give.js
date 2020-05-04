const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "give",
  category: "products",
  description: "To give a person ally,rubeus,staff role",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.cache.some(role => role.name === 'Owner')){
  
  var username = message.mentions.members.first()
  
  if(!args[2]){
    message.reply("subject not found! you didn't specifiy wether it was rubeus or ally or staff sir.")
    return
  }

  if (!args[2].toLowerCase() === "ally"  || !args[2].toLowerCase() === "staff"){
    message.reply("invalid subject!")
    return
  }

  if (!username){
        var docRef = db.collection("users").doc(args[1]);
    docRef.get().then(function(doc) {
    if (doc.exists) {
      roblox.getUsernameFromId(doc.id).then(function(username){
        db.collection('users').doc(doc.id).set({SPECIAL: `${args[2].toLowerCase()}`},{merge: true});
        return message.channel.send(new Discord.MessageEmbed().setTitle("Success!").setDescription("Added!").setFooter("Product System").setColor("#2ecc71"))
        })
           
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
                db.collection('users').doc(doc.id).set({SPECIAL: `${args[2].toLowerCase()}`},{merge: true});
              return message.channel.send(new Discord.MessageEmbed().setTitle("Success!").setDescription("Added!").setFooter("Product System").setColor("#2ecc71"))
            })

            
          })
        })
  
}
  }   
    
}