const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

module.exports = {
  name: "verify",
  category: "verification",
  description: "To verify yourself",
  run: async(client, message, args) => {
if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
        const filter = m => m.content.includes('done');
const collector = message.channel.createMessageCollector(filter, { time: 15000 });
    	var username = args[1];
    	if (username){
        roblox.getIdFromUsername(username).then(id => {
          var tokenID = message.author.id
          
          message.channel.send(new Discord.RichEmbed().setTitle("Please put the following token in your profiles description").setDescription(`**${tokenID}**`).setFooter("When you have done that, say done").setColor("#ff4757")).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time']})
            .then(collected => {
  roblox.getBlurb(`${id}`).tap(function(user){
    console.log(user)
    console.log(message.author.id)
       if (user.match(message.author.id)){
     console.log("successful")
         message.channel.send(new Discord.RichEmbed().setTitle("Success").setDescription(`**You have now been verified as ${username}**`).setFooter("Verification").setColor("#2ecc71"))
         message.member.setNickname(`${username}`)
         message.member.addRole(message.guild.roles.find(role => role.name === "Verified"));
         } else {
                         message.channel.send(new Discord.RichEmbed().setTitle("Error").setDescription(`**Cannot find code on description**`).setFooter("Verification").setColor("#ff4757"))
         }
  })

  })
            .catch(collected => {
              message.channel.send(new Discord.RichEmbed().setTitle("Timed out!").setDescription(`**Session Timed out!**`).setFooter("Verification").setColor("#ff4757"))
            })
          })
        
          
          
        }).catch(function (err) {
          
          message.channel.send(new Discord.RichEmbed().setTitle("Error").setDescription(`**Sorry, that user doesn't seem to exist, double check your spelling and try again.**`).setFooter("Verification").setColor("#ff4757"))
        })
    	} else {
    		message.channel.send(new Discord.RichEmbed().setTitle("Error").setDescription(`**Please enter a username.**`).setFooter("Verification").setColor("#ff4757"))
    	}
    	return;
    
  }
}


/*


exports.run = (client, message, args) => {
  console.log("hello")
	
} */