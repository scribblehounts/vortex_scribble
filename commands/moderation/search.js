const Discord = require("discord.js");
const roblox = require('noblox.js')

module.exports = {
  name: "search",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {
let username = args[0]
     if (username) {
       roblox.getIdFromUsername(username).then(id => { // gets user id for the specific part of the embed
         if (id) {
           roblox.getPlayerInfo(parseInt(id)).then(function(info) {
             let date = new Date(info.joinDate) // states join date
             let embed = new Discord.RichEmbed() // starts a new embed

             .setColor("#f9ae00") // sets the color of the embed
             .setURL(`https://roblox.com/users/${id}/profile`) // base link, changed by the variables 'id'
             .setTimestamp()
             .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`) // gets the roblox profile picture

             .addField("Username", info.username || 'Unresolvable', true) // everything in the embed is undefined, therefore can be changed by the variables
             .addField("User ID", id || 'Unresolvable', true)
             .addField("Blurb", info.blurb || 'Nothing', true)
             .addField("Status", info.status || 'Nothing', true)
             .addField("Account Age", `${info.age} days old` || 'Unresolvable')
             .addField("User Link", `https://roblox.com/users/${id}/profile`)
             .setFooter(`Search Bot`, bot.user.avatarURL)
              message.channel.send({embed})
           })
         }

       }).catch(function (err) {
         message.channel.send("Sorry, that user doesn't seem to exist, double check your spelling and try again!") // catching error
       });
    } else {
       message.channel.send("Please provide a valid username, e.g. '!search ROBLOX'.") 
     }

    }
}