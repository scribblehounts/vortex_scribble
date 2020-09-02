const Discord = require("discord.js");
const roblox = require('noblox.js');


module.exports = {
  name: "alink",
  category: "verification",
  description: "link ur acc",
  run: async(client,message,args,db) => {
     var args = message.content.split(/[ ]+/)
    var code = args[1]
    db.collection('users').where('discord','==',message.author.id).get().then(user => {

    if (user.empty){
      console.log("ya")
      db.collection('verification').where('Code','==',code).get().then(exist => {
      if (exist.empty){
        return message.reply("Invalid code!")
      } else {
        exist.forEach(doc => {
          roblox.getUsernameFromId(doc.id).then(a => {
            db.collection('users').doc(doc.id).set({discord: message.author.id},{merge:true});
            message.member.setNickname(a);
            return message.reply("VERIFIED as: " + `**${a}**`);
          })
        })
      }
      })
    } else {
      return message.reply("You are already linked, type !unlink to unlink your account!");
    }

  })
  }

}

