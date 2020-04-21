const Discord = require("discord.js");

function isNumeric(value) {
  return /^-{0,1}\d+$/.test(value);
}

module.exports = {
  name: "claimticket",
  category: "info",
  description: "To request a support",
  run: async(client, message, args) => {
if (message.author.bot) return; // Dont answer yourself.
         var args = message.content.split(/[ ]+/)
         if (message.member.roles.cache.some(role => role.name === 'Support Staff')) {
if (message.channel.name.toString().length >= 17){
  if(isNumeric(message.channel.name) === true){

  message.channel.send(new Discord.MessageEmbed().setTitle("Support Ticket").setDescription(message.author.tag + " Has claimed this ticket!"))

  message.channel.updateOverwrite(message.author.id, {
    VIEW_CHANNEL: true,
             SEND_MESSAGES: true
})
message.channel.updateOverwrite(client.users.fetch(message.channel.name), {
  VIEW_CHANNEL: true,
           SEND_MESSAGES: true
})
message.channel.updateOverwrite(message.guild.roles.cache.find(c => c.name == "Support Staff"), {
    VIEW_CHANNEL: true,
             SEND_MESSAGES: false
})
message.channel.updateOverwrite(message.guild.roles.cache.find(c => c.name == "Support Staff Trainee"), {
  VIEW_CHANNEL: true,
           SEND_MESSAGES: false
})

  }
}
         }
    }
}


/*


exports.run = (client, message, args) => {
  console.log("hello")
	
} */