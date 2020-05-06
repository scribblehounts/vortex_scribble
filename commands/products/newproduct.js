const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client()
const roblox = require('noblox.js');
const editJsonFile = require('edit-json-file')


const ownerid = "230165427165069312"
const omrooshi = "357838978801729536"
const papo = "532018868181401612"

let FieldValue = require('firebase-admin').firestore.FieldValue;

module.exports = {
  name: "newproduct",
  category: "moderation",
  description: "To verify another player",
  run: async(client,message,args,db) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/)
    if(!message.author.id == ownerid || !message.author.id == omrooshi || !message.author.id == papo) return message.channel.send("You can not use this command!");

var products = {
    productName :null,
    productPrice : null,
    productDescription : null
};

    message.channel.send("What is the product name?")

  }
}
