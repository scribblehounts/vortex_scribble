const Discord = require("discord.js");

module.exports = {
  name: "create",
  category: "moderation",
  description: "Adds an ally",
  run: async (client, message, args) => {
    console.log("called")
    if (message.deletable) message.delete();
    
    if (args.length < 1)
      return message.reply("Nothing to say?").then(m => m.delete(5000));
    
    if (args[0].toLowerCase() === "ally") {
      const embed = new Discord.RichEmbed()
      .setColor("#ff4757")
      .setDescription(args.slice(1).join(" "))
      .setFooter("Ally")
      .setAuthor("Ally")
      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
  }
}