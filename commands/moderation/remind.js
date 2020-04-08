const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
  name: "remind",
  category: "moderation",
  description: "To remind scribble",
  run: async(client,message,args) => {
        if (!message.member.hasPermission("ADMINSTRATOR")) {return}
 
    }
}