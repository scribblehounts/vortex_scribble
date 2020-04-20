const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");


const client = new Client({
  disableEveryone: true
});



const firebase = require("firebase/app");
const FieldValue = require("firebase-admin").firestore.FieldValue;
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const rbx = require('noblox.js')
const fs = require("fs");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

 client.categories = fs.readdirSync("./commands/");
 const AntiSpam = require('discord-anti-spam');
 const antiSpam = new AntiSpam({
     warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
     kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
     banThreshold: 13, // Amount of messages sent in a row that will cause a ban.
     maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
     warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
     kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
     banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
     maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
     maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
     maxDuplicatesBan: 14, // Amount of duplicate messages that trigger a warning.
     exemptPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
     ignoreBots: true, // Ignore bot messages.
     verbose: true, // Extended Logs from module.
     ignoredUsers: [], // Array of User IDs that get ignored.
     // And many more options... See the documentation.
 });
  
 var numDaysBetween = function(d1, d2) {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

 client.on('message', (message) => antiSpam.message(message)); 

client.on("guildMemberAdd", member => {
  let channel = client.channels.cache.get("671258373303566336");

  var a1 = moment(member.createdAt).format("YYYY-MM-DD")
  var a2 = moment(Date.now()).format('YYYY-MM-DD')

  var d1 = new Date(a1)
  var d2 = new Date(a2)
  var daysbetween = numDaysBetween(d1, d2);

  if (daysbetween > 7){
  var role = member.guild.roles.cache.find(user => user.name === "Customer"); // yes
  member.roles.add(role)
  } else {
    var role = member.guild.roles.cache.find(user => user.name === "unroled jail"); // yes
    member.roles.add(role)
  }
  const embed = new Discord.MessageEmbed()
    .setColor("#2ecc71")
    .setTitle(`**Welcome**`)
    .setDescription(
      `**Welcome!** ${member} **to Vortex! We hope you have a good time here!**`
    )
    .setTimestamp()

  channel.send(embed);
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes.js")(app, db,client);

var server = app.listen(3000, function() {
  console.log("Listening on port %s", server.address().port);
});

client.on("ready", () => {
  
  
  
  
  const channel = client.channels.cache.get("671261326483390464");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // Yay, it worked!
    console.log("Successfully connected.");
  }).catch(e => {
    // Oh no, it errored! Let's log it to console :)
    console.error(e);
  });
});

client.on("ready", () => {
  console.log("Online!");
  client.user.setStatus("available");
  client.user.setPresence({
    activities: {
      name: "buy the products now",
      type: "STREAMING",
    }
  });
  
  let myGuild = client.guilds.cache.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount).then(function(success){})
});

client.on('guildMemberAdd', member => {
  let myGuild = client.guilds.cache.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount).then(function(success){})
});

client.on('guildMemberRemove', member => {
  let myGuild = client.guilds.cache.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.cache.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount).then(function(success){})
});


// Collections
client.commands = new Collection();
client.aliases = new Collection();

config({
  path: __dirname + "/.env"
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.id === "700161867527487539"){
    if (message.content.toLowerCase().includes("@everyone")){
      message.author.send("yo man you just fucked up u did @everyone now go apologise to Scribble#1771")
      message.author.ban({days:7,reason:"fuck u @everyone my ass bro"})
    }
  }
})

var forbiddenwords = ["you have been raided","brokensecurity@protonmail.com","broken security","instagram @darkports","I PUT THE FUN IN FUNERAL."];

// Run the command loader
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    if (message.author.bot) return;
  const prefix = "!";

  // anti raid fuck sakes
    if (
    message.nonce === null &&
    message.attachments.size <= 0 &&
    !message.author.bot &&
    message.guild // make sure it's a non-private messages
  ) {
      let myGuild = client.guilds.cache.get('670903593737519104');
      let memberCountChannel = myGuild.channels.cache.get('675498297212928021').send("@everyone HELP HELP RAID ALERT RAID ALERT!!!! " + message.author.tag + " IS USING A FUCKING SELF BOT!")
      message.member.kick({days:7,reason:"suspected raid? : self bot"})
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) {
    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { //if it contains an invite link
      message.delete() //delete the message
        .then(message.channel.send('Link Deleted:\n**Invite links are not permitted on this server**'))
    }
  }
  
  for (var i= 0; i < forbiddenwords.length; i++){
  if(message.content.toLowerCase().includes(forbiddenwords[i])) {
       message.delete()
       message.member.ban({days:7,reason:"raiding alert!"})
    break;
  }
}
  //
  

  
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  
  
  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetch(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // If a command is finally found, run the command
  if (command) command.run(client, message, args, db);
});

// WELCOME MESSAGe




client.login(process.env.TOKEN);