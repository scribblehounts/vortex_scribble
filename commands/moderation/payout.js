const ownerid = "230165427165069312"
const { inspect } = require("util")
const rbx = require('noblox.js')

const COOKIE = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_02325365DF1318B0CF9332BD5A61DDB82AEF64CB0A2F24C5E4B98BEBE705534EF6130B9BF4B14689566D3D0940538C3779971808A795E27000DBB7EA663ED7F06785B839A46EFC819F851277C7B36F20FC3E667BFF97EEEA3165C4C0C357ADF3297C04C925E271BC6732363BB6F38103CC7665AE8CFD02640FE5F2E9E30F1EA0E3D0160DA071CAD63484833169E24D7909B50C2CA7E4355A3480BBC41E880EACD952DD5844070C77A8EE8F157F70AE5CA56566D48C4D7D023253167E1CAEF0830CF8E4AD1C7D1C0FB33948E5457BA5D47F9A6B30485F4AFBE3EBF495F0A02F678EF6740CEEF2ACDAAECB7984479CC529E443F52F941B5F7EA8F17CA3B32115DC8E8076B748BD8C6E8B68C8D4A05A7980D492311C6491F9517EDE3AD6548C398FBD3AE90D783DD33AD671030271B308F10BD705C3"



module.exports = { 
  name: "payout",
  category: "moderation",
  description: "To payout an amount of funds",
    run: async (bot, message, args) => {
          var args = message.content.split(/[ ]+/)
    if(message.author.id == ownerid) {
      rbx.cookieLogin(COOKIE)
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
        rbx.groupPayout(5563351, foundId, amount).then(()=>{
               message.channel.send('ok sent the amount of ' + `**${args[1]}**` + " to " + `**${args[2]}**`)
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