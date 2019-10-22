let Discord = require('discord.js');
let FieldValue = require('firebase-admin').firestore.FieldValue;

const availableProducts = ""

module.exports = {
  name: "redeem",
  category: "market",
  description: "To redeem a purchase",
  run: async(client, message, args, db) => {
if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var product = args[1]
    
    message.reply("You do not own any Vero Tech!")
    }
  }