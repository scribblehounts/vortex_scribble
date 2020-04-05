const Discord = require("discord.js")

const bot = new Discord.Client();

const fs = require ('fs');

const file = JSON.parse(fs.readFileSync("./././warns.json", "utf8"));

module.exports = {
  name: "warn",
  category: "moderation",
  description: "weirdo custom game",
  run: async(client,message,args) => {

if (!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("Sorry. Seems you dont have the correct permissions to run this command!");


if (!file[message.mentions.members.first().id]) {
  file[message.mentions.members.first().id] = {
    warns: 0
  }

};


file[message.mentions.members.first().id] = {
  warns: file[message.mentions.members.first().id].warns + 1
}


fs.writeFile("./warns.json", JSON.stringify(file), (err) => {
  if (err) console.error(err);

  console.log("Added a warn to that bitchass kid!")
});

message.channel.send("Added a warn to the user " + message.mentions.members.first().user.tag);

  }
}
