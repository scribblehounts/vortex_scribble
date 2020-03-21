const ownerid = "230165427165069312"
const { inspect } = require("util")
const rbx = require('noblox.js')

const COOKIE = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_DF47DD3F30DF4AC1771FBBF7D4567A132A3C99DBF1303B9BEB73FCACFBEB5DD4354C9F90EA1653381C24C08C73A83C5D4478247CF04BF12A20FF8F956E169FF40389710C4286826BCF1EDEAE8230AF78E183D3603AA018EA8851BD1B75ABFCA070B31363260E89FA5A31B9F8DA30B6A2286FCC122D53466677A2ABA991CD04278787378C47EB2A83D9FFE5A5944C1930D4A00976870072657D88E96172E1DC47A5A9FC2EB98DEB7CBB38954D25C1C189E5C2C08B5DA9F3160360A79BC14C2183CAB4E1D786AB244DAD1544AA4E8D7CFE813AC5E1AC6A3D4442E38C0E0D8447778648B1EBF12C77D01E5A8AE4371BEAD3D5AAA6F1C415C21BBDE585C23CC21BE5A27B73EFBB805344926729800DF5B85AA8AEFBE477AB0683359095D1F80E0F5E428764EF00B03C29BE06EB4FA8321C153C897F74"


module.exports = { 
  name: "payout",
  category: "moderation",
  description: "To payout an amount of funds",
    run: async (bot, message, args) => {
          var args = message.content.split(/[ ]+/)
    if(message.author.id == ownerid) {
      let msg = await message.reply("are you sure you want to payout " + `**${args[1]}**` + " to " + `**${args[2]}**`)  
      

      
      const filter = m => m.author.id === message.author.id
  const collector = message.channel.createMessageCollector(filter, { max: '1', maxMatches: "1", time: "200000" }) //This is the collector to collect the Message for getting the username.
  
   collector.on("collect", m => {
   if(m.content === 'no' || m.content === 'No') {
     message.channel.send('**ok cancelled sir.**')
     return
   }
    if(m.content === 'yes' || m.content === 'Yes') {
      rbx.getIdFromUsername(args[2]).then(foundId => {
        console.log(foundId)
        var amount = args[1]


  message.channel.send('ok sent the amount of ' + `**${args[1]}**` + " to " + `**${args[2]}**`)



     return
      })
   }   
     
   })
      
      } else {
        return message.reply("you are not authorized to give people funds, wow how low of you of trying to steal our funds thats just wack bro THATS JUST WACK!!").then(msg => msg.delete(5000))
      }
    }
}

