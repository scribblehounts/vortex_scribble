const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const editJsonFile = require('edit-json-file')

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "transfer",
  category: "products",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if (message.member.roles.cache.some(role => role.name === 'Mod')) {
      var username = args[1];
      var second = args[2];
      if(!username){
        return message.reply("format invalid: !transfer [removing person] [new person] [product]")
      }
      
      var produc = args[3]
      var retrievedlist = []
      var item = editJsonFile('././products.json').data
      var product = item[produc]

      if (!product){
        var argsresult = args.slice(3).join(" ")
        let embed = new Discord.MessageEmbed()
        .setColor(3447003)
        .setTimestamp()
        .setTitle("Couldn't find any products!")
         .setDescription("Sorry I looked deep into my database and didn't find any product named, " + `***${argsresult}***` + "?")
         message.channel.send({embed})
       return
      }

      if (username){
      var docRef = db.collection("users").doc(username);
docRef.get().then(function(doc) {
    if (doc.exists) {

      var obj = {}
      obj[product.id] = FieldValue.delete()

      var obj2 = {}
      obj2[product.id] = "owned"

      db.collection('users').doc(`${username}`).update(obj)
      
      db.collection('users').doc(`${second}`).set(obj2,{merge: true});

            message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`**${args[1]} Has been transfered to ${args[2]}!**`).setFooter("Product System").setColor("#2ecc71"))
      }

})
         
        
      }
  }
  }
}
