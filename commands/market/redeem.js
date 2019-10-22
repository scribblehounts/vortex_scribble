let Discord = require('discord.js');
let FieldValue = require('firebase-admin').firestore.FieldValue;

let products = [{'Watch':{ "name": "Watch", "price": 200, "availability": false}}];

module.exports = {
  name: "redeem",
  category: "market",
  description: "To redeem a purchase",
  run: async(client, message, args, db) => {
if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var product = args[1]
    var obj = products.find(o => o[product]);
    message.reply(obj[product])
    }
  }