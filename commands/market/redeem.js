let Discord = require('discord.js');
let FieldValue = require('firebase-admin').firestore.FieldValue;
const bloxy = require('bloxy');
const roblox = new bloxy();

module.exports = {
  name: "redeem",
  category: "market",
  description: "To redeem an item",
  run: async(client, message, args, db) => {
if (message.author.bot) return;
    db.collection('users').create('193104495')
    }
  }