const Discord = require("discord.js")

module.exports = {
  name: "userinfo",
  category: "moderation",
  description: "weirdo custom game",
  run: async(client,message,args) => {
 let uEmbed = new Discord.MessageEmbed()
    .setColor("#ff4757")
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL)
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setFooter(`Bot | Footer`, client.user.displayAvatarURL);

    message.channel.send({embed: uEmbed});
  }
}
