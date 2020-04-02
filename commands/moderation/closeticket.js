const Discord = require("discord.js");

module.exports = {
  name: "closeticket",
  category: "moderation",
  description: "To request a support",
  run: async(client, message, args) => {
if (message.author.bot) return; // Dont answer yourself.
         var args = message.content.split(/[ ]+/)
if (message.channel.name.toString().length >= 17){
  message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription("Closing Ticket in 5 seconds!"))
setTimeout(function(){
  message.channel.delete()
},5000)
}
    }
}


/*


exports.run = (client, message, args) => {
  console.log("hello")
	
} */