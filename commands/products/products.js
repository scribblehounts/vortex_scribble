const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');

const editJsonFile = require('edit-json-file')

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "products",
  category: "products",
  description: "To get products",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    let file = editJsonFile('././products.json').data

    var objects = []

    for (var i in file){
      objects.push(i)
    }

    message.channel.send({ embed: {
      fields: [{
        name: "Products",
        value: objects,
      }]

    }});

  }
}
