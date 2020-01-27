const Discord = require("discord.js");

module.exports = {
  name: "special",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
          var Embed = new Discord.RichEmbed()
    .setAuthor("Announcements",message.guild.iconURL)
    .setColor("#2ecc71")
    .setDescription(argsresult)
    .setImage("https://imgur.com/a/OZj6cHw")
        mChannel.send(Embed)
    } else {
        argsresult = args.join(" ")
          var Embed = new Discord.RichEmbed()
    .setAuthor("Allies",message.guild.iconURL)
    .setColor("#3B3B3B")
    .setDescription(argsresult)
              .setImage("https://i.imgur.com/S9mN2R4.png")
        message.channel.send(Embed)
    }

    }
}