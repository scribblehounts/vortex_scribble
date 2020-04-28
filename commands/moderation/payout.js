const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')

  const bloxy = require("bloxy");
const roblox = new bloxy.Client()

const rbx = require('noblox.js')
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


roblox.login({
    cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_82DE2BC3EDD3E944A845279D3C2F248AD64C2BF785C263F4E5E7399455BD5AEC30824FBA7B0244C50DEB46080D64EE0DCFDB07E5C83BE0FF60A68A87463196A9CEAE512614E54003C98EFEFE7C97D3A81E3BC1A026AEA7EE2A29AADCC76E238DA0C03848055C1C36137F47057DE56F04124AA0ECEF4C941791ED7DBC4F012170389727E4A2DA9F7156F7335C12D3B2436A36C9C21C588A914167C0E922FFD42A0EA21D530592871C6E0F78A94B8C645211041000700BACF16B2450A36C41C28EA9C77C3ACE4DE4DA9BE4AD5FA295890288974999314D4AA3ED705159A75EFD946928C288278EECB0B2999ADBA3E032553C108FA16B297E7A3E0A66900EDF253D1BA57D6EC533F071EA098B8AE555DCE14032291B7D14653520033EA3987D820505C8353A19CEFE062DE75EF04814FB871977D84A"
}).then(()=>{
  
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

