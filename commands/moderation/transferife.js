const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "transferife",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.some(role => role.name === 'Mod')) {
      var username = args[1];
      var second = args[2];
      if (username){
        if (args[2] === ("ife")){
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {
      db.collection('users').doc(`${username}`).set({ife: "removed"},{merge: true});

            message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${args[1]} Has been removed!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        }
      }
  }
  }
}
