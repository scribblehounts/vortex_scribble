const discord = require("discord.js")
const roblox = require("noblox.js") 

const fs = require("fs")
const bot = new discord.Client();

const token = ('NjI3NDA3MDU1MTk1NjAyOTQ0.XY8MbA.EX0bdUCr8SzwTOiS-wYBziMH2is')

bot.on('ready', () =>{
    console.log('Im alive!')
    bot.user.setStatus('available')
bot.user.setActivity("playing with joe mama")
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
    		message.channel.send(`Checking ROBLOX for ${username}`)
        require("./cmds/search.js")(username)
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }
});

bot.login(token);