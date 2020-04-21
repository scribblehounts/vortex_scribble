const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "account",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var person = message.mentions.members.first()

    if (person){
      db.collection("users").where("discord", "==", person.id).get().then(function(querySnapShot){
        if (querySnapShot.empty){
          message.reply("user is not linked")
          return;
        }
        querySnapShot.forEach(function(doc){
          var data = doc.data();
  delete data["discord"];
  
  roblox.getPlayerInfo(parseInt(doc.id)).then(function(info) {
    var products = []
               let embed = new Discord.MessageEmbed() 
  
               .setColor(3447003) 
               .setTimestamp()
               .setTitle(info.username + "'s Account")
               .addField("Username", info.username || 'Unresolvable', true) 
               .addField("User ID", doc.id || 'Unresolvable', true)
               .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${doc.id}&width=420&height=420&format=png`) 
  
               for (var i in data) {
                 products.push(i)
  }
  embed.addField("Products",products, true)
                        message.channel.send({embed})
                                                     
  })
        })
      })
  
      return
    }
    db.collection("users").where("discord", "==", message.author.id).get().then(function(querySnapShot){
      if (querySnapShot.empty){
        message.reply("user is not linked")
        return;
      }
      querySnapShot.forEach(function(doc){
        var data = doc.data();
delete data["discord"];

roblox.getPlayerInfo(parseInt(doc.id)).then(function(info) {
  var products = []
             let embed = new Discord.MessageEmbed() 

             .setColor(3447003) 
             .setTimestamp()
             .setTitle(info.username + "'s Account")
             .addField("Username", info.username || 'Unresolvable', true) 
             .addField("User ID", doc.id || 'Unresolvable', true)
             .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${doc.id}&width=420&height=420&format=png`) 

             for (var i in data) {
               products.push(i)
}
embed.addField("Products",products, true)
                      message.channel.send({embed})
                                                   
})
      })
    })

    
    

      



  }
}
