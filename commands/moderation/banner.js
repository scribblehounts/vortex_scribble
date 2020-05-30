const Discord = require("discord.js");
const Canvas = require('canvas')
module.exports = {
  name: "banner",
  category: "moderation",
  description: "To say a messages",
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
        
        let argsresult;

        const canvas = Canvas.createCanvas(5000,945);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('././sample.png');

        ctx.drawImage(background,0,0,canvas.width,canvas.height);

        var SourceSansPro = Canvas.registerFont('SourceSansPro-SemiBold.ttf',{family: 'SourceSansPro'})

        ctx.font = '400px SourceSansPro';
        //ctx.font = '60px sans-serif';
        ctx.fillStyle = '#ffffff';

        argsresult = args.slice(0).join(" ")

        message.delete()

        ctx.fillText(argsresult, canvas.width / 5, canvas.height / 1.5);
        //ctx.fillText(argsresult, canvas.width / 2.5, canvas.height / 1.8);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'banner.png');

        message.channel.send(attachment)
    }
}