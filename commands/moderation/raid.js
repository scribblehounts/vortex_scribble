const Discord = require("discord.js");
const fs = require('fs')

const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const papo = "532018868181401612"

module.exports = {
  name: "raid",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {
    if(!message.author.id == ownerid || !message.author.id == omrooshi || !message.author.id == papo) return message.channel.send("You can not use this command!");
console.log(args.slice(1).join(" "))
    fs.appendFile('././forbidden.txt', args.slice(1).join(" "),function(err){
      if (err) throw err;
      message.channel.send('Saved!');
    })
    }
}