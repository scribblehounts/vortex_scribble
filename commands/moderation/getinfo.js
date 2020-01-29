const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "getinfo",
  category: "moderation",
  description: "To give a product to another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[]+/)
        var tokenID = message.author.id
        var chosenName = message.guild.members.get(tokenID);
        if (tokenID){
          
          let ref = db.collection('users');
          let queryRef = (ref.where('tokenID', '==', `${tokenID}`));
          return queryRef.get()
          .then(res => {
            res.forEach(doc => {
              var userID = (doc.id, '=>', doc.data());
              message.channel.send(new Discord.RichEmbed().setTitle(userID).setImage())
            })
          })       
        }
  }
}