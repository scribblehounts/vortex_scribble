const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
var roblox = require('noblox.js');
const prefix = "!"
bot.on("ready", async () => {
  
  bot.user.setActivity("u and your mama", {type: "WATCHING"});
  console.log("Online!")
});




function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

bot.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('verify', message)){
    	var username = args[1];
    	if (username){
        roblox.getIdFromUsername(username).then(id => {
          var tokenID = message.author.id
          
          message.channel.send(new Discord.RichEmbed().setTitle("Please put this in your profiles description").setDescription(`${tokenID}`).set)
        
        }).catch(function (err) {
          
          message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again.")
        })
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

bot.login(process.env.TOKEN);