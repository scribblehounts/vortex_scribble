const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const { inspect } = require("util")
const rbx = require('noblox.js')

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
    if(m.content === 'yes' || m.content === 'Yes') {
      rbx.getIdFromUsername(args[2]).then(foundId => {
        console.log(foundId)
        var amount = args[1]


roblox.login({
    cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_56AE48EC241DE1E16B7D416C73B639940223849660604E7451AF4CE9DE26B33CD2F5BF6F266A86D2BB8134B624881E4A85B1F09549408D6053481C0C39F5E9226A2BC4362CC206A8A0211301283DF4567308E9E6EA5C62EE312E18E91E5A48DEBBE65F5508709C65C53BE189680DF5B8DFA13C0FF0A2E433293C1B865CBD9629ECC1E403FFA488D835C8197D82334D5B90616CA9C84A13A897862AC22213125E9E3211A5A520A3AB3F31CEE150EDBD494F6AAB1B7CC5F6833D42E30B8CFA9DA3760854638ACBD71300EF53D17876CB8F816772B88C9AA3EC3CF3A9EADF61CC9B32273526957199D587661179D6218D6971D1C96267DAC268B6CCCCB98F377A5A03C100FB952FFC94F100E558B40EECBDB48BC71CE49BF154307BFA35C4ACB4847E935A27683730DFA1F154222312FB5E94CB0EC4"
}).then(()=>{
  
  roblox.getGroup(5563351).then(group=>{


 group.payoutUsers([
   {
     userId: foundId,
     amount: amount
   }
 ])
  
      message.channel.send('ok sent the amount of ' + `**${args[1]}**` + " to " + `**${args[2]}**`)
    
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

