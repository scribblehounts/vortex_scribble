const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const ms = require('ms');
let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "lockdown",
  category: "moderation",
  description: "To panic",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
if (message.member.roles.some(role => role.name === 'Owner')){
  
    try {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have permission to lockdown or unlock!')
        .then(msg => msg.delete({
            timeout: 10000
        }));
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['release', 'unlock']
    let timeemb = new Discord.RichEmbed()
    .setDescription(`You must set a duration for the lockdown in either hour(s), minute(s) or second(s)\nExample: **!lockdown 1h**`)
    .setColor(`GREEN`)
    if (!time) return message.channel.send(timeemb).then(msg => {
      msg.delete(10000)
    })

    if (validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: null
            })
            .then(() => {
                let liftedemb = new Discord.RichEmbed()
                .setDescription(`Lockdown lifted...`)
                .setColor(`RED`)
                .setTimestamp()
                message.channel.send(liftedemb)
                clearTimeout(client.lockit[message.channel.id]);
                delete client.lockit[message.channel.id];
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            })
            .then(() => {
          let successemb = new Discord.RichEmbed()
          .setDescription(`Channel Locked down for **${ms(ms(time), { long:true })}**`)
          .setColor(`GREEN`)
                message.channel.send(successemb)
                    .then(() => {

                        client.lockit[message.channel.id] = setTimeout(() => {
                            message.channel.overwritePermissions(message.guild.id, {
                                    SEND_MESSAGES: null
                                })
                                .then(message.channel.send('Lockdown lifted. Everyone can chat now..'))
                                .catch(console.error);
                            delete client.lockit[message.channel.id];
                        }, ms(time));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
    }
    } catch(err) {
      const errorlogs = client.channels.get('675498297212928021')
      message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)
      errorlogs.send(`Error on lockdown commands!\n\nError:\n\n ${err}`)
    }
  }
  }
}