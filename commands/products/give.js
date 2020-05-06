const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const editJsonFile = require('edit-json-file')

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "give",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.cache.some(role => role.name === 'Mod')) {
      var username = args[1];
      if (username){
            let file = editJsonFile('././products.json').data
            for (var i in file){
              console.log("correct")
              if (!args[2] === i){
                console.log("wrong")
                return message.reply("invalid subjects")
              }
            }
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {
      var obj = {}
      obj[args[2]] = "owned"

      db.collection('users').doc(`${username}`).set(obj,{merge: true});

            message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`**${args[1]} Has been added!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
        
      }
  }
  }
}
