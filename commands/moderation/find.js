const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "find",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.some(role => role.name === 'Mod')){
  var username = args[1];
  var second = args[2];
  
  if (username){
    if (second === "ife"){
            var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
  if (doc.exists){
      message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} owns ${second}**`).setFooter("Product System").setColor("#2ecc71"))
  } else {
    
    message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} doesn't own ${second}**`).setFooter("Product System").setColor("#2ecc71"))
  }
})
    }
  }
}
    
    }
}