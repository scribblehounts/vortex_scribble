const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "transfer",
  category: "moderation",
  description: "To give a product to another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[]+/)
    if (args[3]) {
      if (message.member.roles.some(role => role.name === "Mod")) {
        var tokenID = message.mentions.users.first().id.replace('>', '').replace('!', '');
        var chosenName = message.guild.members.get(tokenID);
        if (tokenID){
          
          let ref = db.collection('users');
          let queryRef = (ref.where('tokenID', '==', `${tokenID}`));
          return queryRef.get()
          .then(res => {
            res.forEach(doc => {})
          })
          
          
        }
        
        
      }
      
      
    }
    
    
  }
}