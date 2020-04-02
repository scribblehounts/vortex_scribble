const Discord = require("discord.js");

module.exports = {
  name: "closeticket",
  category: "moderation",
  description: "To request a support",
  run: async(client, message, args) => {
if (message.author.bot) return; // Dont answer yourself.
         var args = message.content.split(/[ ]+/)
if (message.channel.name.toString().length >= 17){
  if (!args[1]){
  return message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription("Please give a reason to close the ticket!"))
  }
  message.channel.send(new Discord.RichEmbed().setTitle("Support Ticket").setDescription("Closing ticket because " + args[2] + "!"))
}
    }
}


/*


exports.run = (client, message, args) => {
  console.log("hello")
	
} */