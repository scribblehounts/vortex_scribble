const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "ifeowned",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    
    db.collection("users").where("discord" || "tokenID", "==", message.author.id).get().then(function(querySnapShot){
      querySnapShot.forEach(function(doc){
        var data = doc.data();
        if (data.tokenID){
if (data.ife){
                  message.channel.send(new Discord.RichEmbed().setTitle(`**${doc.data().tokenID}**`).setDescription("you own it yes").setFooter("Product System").setColor("#2ecc71"))
}
        }
                if (data.discord){
                  if (data.ife){
                  message.channel.send(new Discord.RichEmbed().setTitle(`**${doc.data().discord}**`).setDescription("you own it yes").setFooter("Product System").setColor("#2ecc71"))
                  }
        }
      })
    })

    
    

      



  }
}
