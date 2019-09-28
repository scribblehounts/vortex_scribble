const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = Discord.Client()

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`)
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  
  bot.user.setActivity("u and your mama", {type: "WATCHING"});

});


function emBed(message, second){
  const Embed = new Discord.RichEmbed()
  .setColor("#F55858")
  .setTitle(message)
  if (second){
    Embed.setDescription(second)
  }
}

bot.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('verify', message)){
    	var username = args[1];
    	if (username){
        roblox.getIdFromUsername(username).then(id => {
          var tokenID = message.author.id
         message.reply(`Please put this in your profiles description ${tokenID}`)
        }).catch(function (err) {
          
          message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again.")
        })
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

bot.login(botconfig.token);