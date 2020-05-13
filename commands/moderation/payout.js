const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')

  const bloxy = require("bloxy");
const roblox = new bloxy.Client()

async function login(){
  bloxy.login({cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D5B52A06EFC3E1457983488F98FC68ED2EA889C7BF58AF2A3BAA207D60423C08A65A340BCC80C08823020A7C8B3E4C5302108492FBD42D825844514018647BAD44348F893803D6584DF9A3042690BB7EB99C02B5EC4E5B1C6D2080FB9461F50301B9548B95710BBF8D2DB8519B8A27B876BCFD7638F6801BFE878D327398CEBFF365E7054593697BD93E99C18223548C421674B3793001F37244675D67F639017CA021508768D646D2925736D5B214D91F4FCE3B459A6056C0790BA8BCE55E4D7BBBA993EACBEA0DED7EC71414CDDD504421DAB1E8F2730E79891CB7D0E185F42C1502E863716A0D4E531057E808D6B29D39D538CD12974FA734FA1FE8FE7197D65F22E1956360BABEE8C28A6D5BBF722F18BE1FD69DBC2472E1774864464E5C303B90907BE0D1005EE76E754C9C903C456EE293"});
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

