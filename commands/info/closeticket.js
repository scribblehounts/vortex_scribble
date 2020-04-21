const Discord = require("discord.js");

function isNumeric(value) {
  return /^-{0,1}\d+$/.test(value);
}

module.exports = {
  name: "closeticket",
  category: "info",
  description: "To request a support",
  run: async(client, message, args) => {
if (message.author.bot) return; // Dont answer yourself.
         var args = message.content.split(/[ ]+/)
if (message.channel.name.toString().length >= 17){
  if(isNumeric(message.channel.name) === true){
  message.channel.send(new Discord.MessageEmbed().setTitle("Support Ticket").setDescription("Closing Ticket in 5 seconds!"))
setTimeout(function(){
  message.channel.delete()
},5000)
  }
}
    }
}


/*


exports.run = (client, message, args) => {
  console.log("hello")
	
} */