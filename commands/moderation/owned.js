const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "owned",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)

        if (args[2] === ("ife")){
      var docRef = db.collection("users").doc(message.author.id);
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${message.author.id}`).set({ife: "owned"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been added!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
  }
  }
}
