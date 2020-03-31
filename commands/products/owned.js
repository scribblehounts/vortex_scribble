const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "owned",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    
    db.collection("users").where("discord", "==", message.author.id).get().then(function(querySnapShot){
      querySnapShot.forEach(function(doc){
        var data = doc.data();
delete data["discord"];
        var json = JSON.stringify(data)
        message.reply(json)
      })
    })

    
    

      



  }
}
