const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const prefix = "!";
bot.on("ready", async () => {
  
  bot.user.setActivity("u and your mama", {type: "WATCHING"});
  console.log("Online!")
  console.log(roblox.getStatus(13094490))
});




function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

bot.on('message', (message) => {
  const filter = m => m.content.includes('done');
const collector = message.channel.createMessageCollector(filter, { time: 15000 });
  
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('verify', message)){
    	var username = args[1];
    	if (username){
        roblox.getIdFromUsername(username).then(id => {
          var tokenID = message.author.id
          
          message.channel.send(new Discord.RichEmbed().setTitle("Please put the following token in your profiles description").setDescription(`**${tokenID}**`).setFooter("When you have done that, say done").setColor("#ff4757")).then(() => {
            message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time']})
            .then(collected => {
              var playerStatus = roblox.getStatus(`${id}`)
                console.log(playerStatus)


            })
            .catch(collected => {
              message.channel.send("Verification Timed out!")
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
});

bot.login(process.env.TOKEN);