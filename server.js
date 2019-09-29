require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

const { CommandHandler } = require("djs-commands");

const CH = new CommandHandler({
    folder: __dirname + '/commands/',
  prefix: ['!']
  });


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

client.on("message", (message) => {
  let args = message.content.split(" ");
  let command = args[0];
  let cmd = CH.getCommand(command);
  if(!cmd) return;
  
  try{
    cmd.run(client, message, args);
  }catch(e){
    console.log(e)
  }
  
})

client.login(process.env.TOKEN);