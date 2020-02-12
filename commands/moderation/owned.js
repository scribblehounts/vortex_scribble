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
    
    db.collection("users").where("discord" || "tokenID", "==", "230165427165069312").get().then(function(querySnapShot){
      querySnapShot.forEach(function(doc){
        var data = doc.data();
        if (data.tokenID){
                  message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**${doc.data().tokenID} Has been added!**``).setFooter("Product System").setColor("#2ecc71"))
        }
      })
    })

    
    

      



  }
}
