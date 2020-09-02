const Discord = require("discord.js");
const roblox = require('noblox.js');


module.exports = {
  name: "unlink",
  category: "verification",
  description: "unlink ur acc",
  run: async(client,message,args,db) => {
     var args = message.content.split(/[ ]+/)
    db.collection('users').where('discord','==',message.author.id).get().then(user => {


    if (user.empty){
      return message.reply("You are not linked!");
    } else {
      user.forEach(doc => {
          roblox.getUsernameFromId(doc.id).then(a => {
            db.collection('users').doc(doc.id).set({discord: ""},{merge:true});
            message.member.setNickname(message.author.name);
            return message.reply("UNLINKED: " + `**${a}**`);
          })
        })
    }

  })
  }

}

