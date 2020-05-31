const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const editJsonFile = require('edit-json-file')

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "retrievetest",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if(!args[1]){
return message.channel.send("Invalid product! Do !products to retrieve the correct one!")
}
    db.collection('users').where('discord','==',message.author.id).get().then(exist => {
        if (exist.empty){
          message.channel.send("you arent linked")
        } else {
          
          var produc = args[1]
          var retrievedlist = []
          var item = editJsonFile('././products.json').data
          var product = item[produc]

          if (!product){
            var argsresult = args.slice(1).join(" ")
            let embed = new Discord.MessageEmbed()
            .setColor(3447003)
            .setTimestamp()
            .setTitle("Couldn't find any products!")
             .setDescription("Sorry I looked deep into my database and didn't find any product named, " + `***${argsresult}***` + "?")
             message.channel.send({embed})
           return
          }

              exist.forEach(doc => {
                if (doc.data()[product.id]){
                  message.member.roles.add(message.guild.roles.cache.find(role => role.name === (product.role)));
    retrievedlist.push(product.name);

                  message.author.send({embed: {
                title:("Purchase Received!"),
                description: ("Thank you for purchasing the " + product.name + " you have automatically been roled to " + product.role),
                
                fields:[{
                  name: "Model:",
                  value: `You can get the Model by clicking on this [link](${product.model}) Make sure to read the README inside it and if you have any questions, create a support ticket in #commands by doing, !support [ reason ]`,
                }]
              }});
      
              if (product.setup){
                message.author.send({embed: {
                 fields: [{
                   name: "Setup Video:",
                   value: `There is a setup video available for this product! To watch it press this [link](${product.setup})`
                 }]
                }});
              }
              let embed = new Discord.MessageEmbed()
              .setColor(3447003)
              .setTimestamp()
              .setTitle("Retrieved!")
             console.log(retrievedlist)
                 retrievedlist.forEach(function(i){
                embed.addField("Given Role:",i + "\n")
                          })

                } else {
                  let embed = new Discord.MessageEmbed()
                  .setColor(3447003)
                  .setTimestamp()
                  .setTitle("You don't own this product!")
                   .setDescription("Sorry but it seems that my database doesn't show that you own this product?")
                   message.channel.send({embed})
                 return
                }
              })

          /*
           if(!message.member.roles.cache.find(r => r.name === "IFE Client")){
          exist.forEach(doc => {
            if (doc.data().ife){
              message.member.roles.add(message.guild.roles.cache.find(role => role.name === "IFE Client"));
retrievedlist.push("IFE Client");
            }
          })
           };
                     if(!message.member.roles.cache.find(r => r.name === "Immigration")){
          exist.forEach(doc => {
            if (doc.data().immigration){
              message.member.roles.add(message.guild.roles.cache.find(role => role.name === "Immigration"));
retrievedlist.push("Immigration");
            }
          })
           };
          
                               if(!message.member.roles.cache.find(r => r.name === "Staff Panel")){
          exist.forEach(doc => {
            if (doc.data().staffpanel){
              message.member.roles.add(message.guild.roles.cache.find(role => role.name === "Staff Panel"));
retrievedlist.push("Staff Panel");
            }
          })
           };

           if(!message.member.roles.cache.find(r => r.name === "Bag Drop")){
            exist.forEach(doc => {
              if (doc.data().bagdrop){
                message.member.roles.add(message.guild.roles.cache.find(role => role.name === "Bag Drop"));
  retrievedlist.push("Bag Drop");
              }
            })
             };

             if(!message.member.roles.cache.find(r => r.name === "Seat Book")){
              exist.forEach(doc => {
                if (doc.data().seatbook){
                  message.member.roles.add(message.guild.roles.cache.find(role => role.name === "Seat Book"));
    retrievedlist.push("Seat Book");
                }
              })
               };
             */
            /*
          if(retrievedlist.length < 1 || retrievedlist === undefined){
                        let embed = new Discord.MessageEmbed()
             .setColor(3447003)
             .setTimestamp()
             .setTitle("Couldn't find any products!")
              .setDescription("Sorry but I couldn't find any products to role you with!")
              message.channel.send({embed})
            return
          }
          */




        }
      })
  }
}
