const Discord = require("discord.js")

const bot = new Discord.Client();

const fs = require ('fs');

const file = JSON.parse(fs.readFileSync("./././warns.json", "utf8"));

module.exports = {
  name: "profile",
  category: "moderation",
  description: "weirdo custom game",
  run: async(client,message,args) => {

if (!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("Sorry. Seems you dont have the correct permissions to run this command!");



let user = message.mentions.users.first() || message.author;


let embed = new Discord.RichEmbed()
.setColor("BLUE")
.setTitle(`${user.username} 's profile!`)
.setDescription(` 

**Warns**: ${file[user.id].warns}

**Tag**: ${user.tag}

**Id**: ${user.id}



   `);


   message.channel.send(`Loading ${user.tag} profile....`)
   .then(ms => 
   ms.edit({embed})
   )
  .catch(console.error)

  }
}
