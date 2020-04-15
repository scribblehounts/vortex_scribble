const Discord = require("discord.js");

module.exports = {
  name: "say",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
          var Embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name,message.guild.iconURL)
    .setColor("#2ecc71")
    .setDescription(argsresult);
        mChannel.send(Embed)
    } else {
        argsresult = args.join(" ")
          var Embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name,message.guild.iconURL)
    .setColor("#2ecc71")
    .setDescription(argsresult);
        message.channel.send(Embed)
    }

    }
}