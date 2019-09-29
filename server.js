require("http").createServer(async (req,res) => { res.statusCode = 200; res.write("ok"); res.end(); }).listen(3000, () => console.log("Now listening on port 3000"));

const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
})

client.on('ready', () => {
  console.log("Online!")
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'with happiness',
            type: "STREAMING",
            url: "https://twitch.tv/scribblehounts"
        }
    });
});

// Collections
client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    const prefix = "!";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

// WELCOME MESSAGe

 client.on("guildMemberAdd", (member) => {

    let channel = client.channels.get('627712783957491712');

    const embed = new Discord.RichEmbed()
    .setColor("#2ecc71")
    .setTitle(`**Welcome**`)
    .setDescription(`**Welcome!** ${member} **to Vero! We hope you have a good time here!**`)
    .setAuthor("VeroAPI","https://i.imgur.com/UaHfuUX.png")
    .setTimestamp()
    .setImage("https://i.imgur.com/UaHfuUX.png")
    
    channel.send(embed)
});


client.login(process.env.TOKEN);