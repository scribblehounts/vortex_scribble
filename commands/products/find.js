const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "find",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.some(role => role.name === 'Mod')){
  
  var username = message.mentions.members.first()
  var second = args[2];
  
  if (!username){
    return message.reply("supply someone!")
  }
  
  if (!second){
    return message.reply("invalid format, !find [@someone] [product]")
  }
  
    if (second === "ife"){
  var docRef = db.collection('users').where('discord','==',username.id).get().then(exist => {
              exist.forEach(doc => {
            if (doc.data().ife){
      message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} owns ${second}**`).setFooter("Product System").setColor("#2ecc71"))
            } else {
    message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} doesn't own ${second}**`).setFooter("Product System").setColor("#2ecc71"))            
  }
})
})
}
  
    if (second === "immigration"){
  var docRef = db.collection('users').where('discord','==',username.id).get().then(exist => {
              exist.forEach(doc => {
            if (doc.data().immigration){
      message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} owns ${second}**`).setFooter("Product System").setColor("#2ecc71"))
            } else {
    message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${username} doesn't own ${second}**`).setFooter("Product System").setColor("#2ecc71"))            
  }
})
})
}


    
  }
}
    
    
}