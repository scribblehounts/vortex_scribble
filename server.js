require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const prefix = "!";
bot.on('ready', () => {
  console.log("Online!")
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://twitch.tv/scribblehounts"
        }
    });
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
  
  if(isCommand('apply ally', message)){
    message.delete()
    message.author.send(new Discord.RichEmbed().setTitle("Application").setDescription("Thank you for requesting an application to be one of our allies, please answer the following questions as truthly as you can").setColor("#2ecc71"))
    message.channel.awaitMessages(m => m.content.includes('start'), { maxMatches: 1, time:30000, errors: ['time']})      .catch(collected => {
      message.author.send("Application Timed out!")
    })
    .then(collected => {
      message.author.send("Okay lets start")
    })

    
  }
});

bot.login(process.env.TOKEN);