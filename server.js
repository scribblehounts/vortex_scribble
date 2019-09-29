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

client.config = require("./config.js");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.TOKEN);