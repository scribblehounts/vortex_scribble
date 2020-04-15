const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "retrieve",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    db.collection('users').where('discord','==',message.author.id).get().then(exist => {
        if (exist.empty){

        } else {
          
          var retrievedlist = []
          
           if(!message.member.roles.cache.find(r => r.name === "IFE Client")){
          exist.forEach(doc => {
            if (doc.data().ife){
              message.member.addRole(message.guild.roles.cache.find(role => role.name === "IFE Client"));
retrievedlist.push("IFE Client");
            }
          })
           };
                     if(!message.member.roles.cache.find(r => r.name === "Immigration")){
          exist.forEach(doc => {
            if (doc.data().immigration){
              message.member.addRole(message.guild.roles.cache.find(role => role.name === "Immigration"));
retrievedlist.push("Immigration");
            }
          })
           };
          
                               if(!message.member.roles.cache.find(r => r.name === "Staff Panel")){
          exist.forEach(doc => {
            if (doc.data().staffpanel){
              message.member.addRole(message.guild.roles.cache.find(role => role.name === "Staff Panel"));
retrievedlist.push("Staff Panel");
            }
          })
           };
             
          if(retrievedlist.length < 1 || retrievedlist === undefined){
                        let embed = new Discord.MessageEmbed()
             .setColor(3447003)
             .setTimestamp()
             .setTitle("Couldn't find any products!")
              .setDescription("Sorry but I couldn't find any products to role you with!")
              message.channel.send({embed})
            return
          }
          
            let embed = new Discord.MessageEmbed()
             .setColor(3447003)
             .setTimestamp()
             .setTitle("Retrieved!")
            console.log(retrievedlist)
                retrievedlist.forEach(function(i){
               embed.addField("Given Role:",i + "\n")
                         })
              message.channel.send({embed})
        }
      })
  }
}
