let Discord = require('discord.js');
let FieldValue = require('firebase-admin').firestore.FieldValue;

let products = [{'Watch':{'name':'Watch','price':200,'availability':false}}];

module.exports = {
  name: "info",
  category: "market",
  description: "To redeem a purchase",
  run: async(client, message, args, db) => {
if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    var product = args[1]
    var obj = products.find(o => o[product]);
    console.log(obj[product])
    message.channel.send("Product: " + obj[product].name.toString() + " Price: " + obj[product].price.toString() + " Availability: " +  obj[product].availability.toString());
    }
  }