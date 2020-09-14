const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')

  const bloxy = require("bloxy");
const roblox = new bloxy.Client()

async function login(){
  roblox.login({cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_EA34F77DEC4F2994FE95B73CD1C2E7E7CCEF6FB88354B7A81D2437692B572723543C742252EC7C88D46D9F603FA5BE78BB9CD2B89569FEC9D3279883CE8EDE43C2EEB2346B2B739F8DC4AD6DC8328C114A47E53C57D765D0F4D17AB1F0D67F4EA0ED1A7301A2E6158A6636F46B50F054B3DE8BF1D8546C8BEB5C4F87DD923F341A179A041855D30B6330E9D1CF6BA24EDCC0E056D400CF3D27E221FDC4698537A67ED4465E16F229C7A45BF842C9A8A24D6EBF8CE40C63C05C287C44D86BABB8D7A77B621AD4854AD1116B87D0E0F4BA5897F0EBE47A1CC89585E3BF3DC4A32286BCD0FB4E916D004F41A3A88B8A2B18B120AC5EC1A0C79F12825AE01BAC55A9987402D6CD3A9074F083383D870F38078AB788A352951B1F2A6BD28A1DB307CBF7B2F16F1CA9623DBE761A51A6D1E7B214603857"});
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
  console.log("logged")
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

