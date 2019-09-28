const discord = require("discord.js")
const roblox = require("noblox.js") 

const fs = require("fs")
const bot = new discord.Client();

const token = ('NjI3NDA3MDU1MTk1NjAyOTQ0.XY8MbA.EX0bdUCr8SzwTOiS-wYBziMH2is')

bot.on('ready', () =>{
    console.log('Im alive!')
    bot.user.setStatus('available')
bot.user.setActivity("playing with myself mama") // GAY
})

var prefix = '!';

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
         message.reply('')
        }).catch(function (err) {
          message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again.")
        })
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

bot.login(token);
