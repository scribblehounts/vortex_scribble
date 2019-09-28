function emBed(message, second){
  const Embed = new discord.RichEmbed()
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