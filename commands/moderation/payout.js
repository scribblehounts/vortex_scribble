const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')

  const bloxy = require("bloxy");
const roblox = new bloxy.Client()

async function login(){
  bloxy.login({cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_25B25782671F9ACD5D92164D26677943CDB56321E93E56DA5FDB8E8AF2227A3F01D25D7A3D9DD1227B778E1D8A6E4434EE670AD7C7AC3CC1C52CF6820B52648F03A520F587E4732ACAA9DFB17529C999777F00F583FA54D4780873811E2B99A997AA45291AD74B28C66DD0AD708DF9E971214ECB4EB37BD8730D7511C6B032EDB8B9F15B265A058114AD8771FAD28F5E685B5DA1BEAA0BBE653D2181AB55C5966C9DCCE45D9AFCA12E23D682F7169DAC6EE6F75192333C9E7ED6576D5ED0DF3A5B69BED5C8F76135FADBDE6862D0206F1E8C6191222EECB2ED1A3D2D03FF8D0C956FC536BE17D0B3E9ABAEE2A106D6239871A4ACF2582EB354B27BBF00AB8A1FB3B76DDD7651CB96C893D84B69A04ACD0AC33CBCDC9D9D733F3200E4BEC1CD0CE96A7428AE336A4A8CE415C1A34F59F5AD1FB5A1"});
}

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


login().then(()=>{
  
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

