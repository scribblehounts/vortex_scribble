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
        


             let embed = new Discord.RichEmbed() // starts a new embed

             .setColor(3447003) // sets the color of the embed
             .setTimestamp()
             .setTitle("Purchased Products")
             for (var i in data) {
               embed.addField("Product:",i + "\n")
}
                      message.channel.send({embed})
                                                   
           
      })
    })

    
    

      



  }
}
