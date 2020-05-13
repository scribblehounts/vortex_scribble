const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')
const settings = require('../../settings.json')
const cookie = settings.cookie
  const bloxy = require("bloxy");
const roblox = new bloxy.Client()
module.exports = { 
  name: "payout",
  category: "moderation",
  description: "To payout an amount of funds",
    run: async (bot, message, args) => {
          var args = message.content.split(/[ ]+/)
    if(message.author.id == ownerid || message.author.id == omrooshi) {
      let msg = await message.reply("are you sure you want to payout " + `**${args[1]}**` + " to " + `**${args[2]}**`)  
      

      
      const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) //This is the collector to collect the Message for getting the username.
  
   collector.on("collect", m => {
   if(m.content === 'no' || m.content === 'No') {
     message.channel.send('**ok cancelled sir.**')
     return
   }
    if(m.content === 'yes' || m.content === 'Yes' || m.content === "fucking do it ya twat") {
      rbx.getIdFromUsername(args[2]).then(foundId => {
        console.log(foundId)
        var amount = args[1]


roblox.login(roblox.cookieLogin(cookie)).then(()=>{
  
  roblox.getGroup(5563351).then(group=>{


 group.payoutUsers([
   {
     userId: foundId,
     amount: amount
   }
 ])
  var user = foundId
      message.channel.send('ok sent the amount of ' + `**${args[1]}**` + " to " + `**${args[2]}**`)
      rbx.getUsernameFromId(user).then(a => {
        rbx.getPlayerInfo(user).then(function(info) {
      discord.users.cache.get('230165427165069312').send({embed: {
        color: 3447003,
        author: {
          name: info.username,
          icon_url: (`https://www.roblox.com/bust-thumbnail/image?userId=${user}&width=420&height=420&format=png`)
        },
        title: user,
        
        fields: [{
          name: "Payout Sent!",
          value: amount,
        }

      ],
        timestamp: new Date(),
        footer: {
          text: "Vortex Payouts"
        }
      }})
    })
  })
  }).catch(function(err){
      message.channel.send('error detected when trying to payout .. ' + err)
  })
  })
        
        




     return
      })
   }   
     
   })
      
      } else {
        return message.reply("you are not authorized to give people funds, wow how low of you of trying to steal our funds thats just wack bro THATS JUST WACK!!").then(msg => msg.delete(5000))
      }
    }
}

