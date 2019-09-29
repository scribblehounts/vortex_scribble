require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();


client.on('ready', () => {
  console.log("Online!")
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'with depression',
            type: "STREAMING",
            url: "https://twitch.tv/scribblehounts"
        }
    });
});

client.commands = new Collection();


client.login(process.env.TOKEN);