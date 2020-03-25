const Discord = require("discord.js");
const roblox = require('noblox.js');


module.exports = {
  name: "link",
  category: "verification",
  description: "link ur acc",
  run: async(client,message,args,db) => {
     var args = message.content.split(/[ ]+/)
    var code = args[1]
var docRef = db.collection("users").doc(message.author.id);  
docRef.get().then(function(doc) {
    if (doc.exists) {
            roblox.getUsernameFromId(doc.get("RBLX")).then(a => {
return message.reply("you are already linked to " + `**${a}**`);
            })
    } else {
      console.log(code)
            db.collection('verification').where('Code','==',code).get().then(exist => {
        if (exist.empty){
          return message.reply("invalid code!")
        } else {
          exist.forEach(doc => {
                  roblox.getUsernameFromId(doc.data().RBLX).then(a => {
                    db.collection('users').doc(message.author.id).collection('owned').doc('0').set({});
                    message.member.setNickname(a);
                      db.collection('users').doc(doc.data().RBLX).set({discord: message.author.id},{merge:true});
                        return message.reply("VERIFIED as: " + `**${a}**`);
                  })
            db.collection('verification').doc(doc.data().RBLX).delete();
          })

        }
            })
    }
      })
  }
}

