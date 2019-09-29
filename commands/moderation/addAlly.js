const Discord = require("discord.js");

module.exports = {
  name: "addAlly",
  category: "moderation",
  description: "Adds an ally",
  usage: "<input>",
  run: async (client, message, args) => {
    if (message.deletable) message.delete();
    
    if (args.length < 1)
      return message.reply("Nothing to say?").then(m => m.delete(5000));
    
    const roleColor = message.guild.me.displayHexColor === "#000000" ? "ffffff" : message.guild.me.displayHexColor;
    
    if (args[0].toLowerCase() === "embed") {
      const embed = new Discord.RichEmbed()
    }
  }
}