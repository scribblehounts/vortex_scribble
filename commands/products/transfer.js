const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "transfer",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.some(role => role.name === 'Mod')) {
      var username = args[1];
      var second = args[2];
      if(!username){
        return message.reply("format invalid: !transfer [removing person] [new person] [product]")
      }
      
      if (username){
        if (args[3] === ("ife")){
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${username}`).update({ ife: FieldValue.delete() })
      
      db.collection('users').doc(`${second}`).set({ife: "owned"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been transfered to ${args[2]}!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        }
        
                if (args[3] === ("immigration")){
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${username}`).update({ immigration: FieldValue.delete() })
      
      db.collection('users').doc(`${second}`).set({immigration: "owned"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been transfered to ${args[2]}!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        }
        
                        if (args[3] === ("staffpanel")){
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${username}`).update({ staffpanel: FieldValue.delete() })
      
      db.collection('users').doc(`${second}`).set({staffpanel: "owned"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been transfered to ${args[2]}!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        }
        
      }
  }
  }
}
