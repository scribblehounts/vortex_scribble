const ownerid = "230165427165069312"
const { inspect } = require("util")

module.exports = { 
  name: "payout",
  category: "moderation",
  description: "To payout an amount of funds",
    run: async (bot, message, args) => {
    if(message.author.id == ownerid) {
      message.reply("are you sure you want to payout " + args[2] + " to " + args[3])  
      } else {
        return message.reply("you are not authorized to give people funds, wow how low of you of trying to steal our funds thats just wack bro THATS JUST WACK!!").then(msg => msg.delete(5000))
      }
    }
}