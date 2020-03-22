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

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

client.on("guildMemberAdd", member => {
  let channel = client.channels.get("671258373303566336");

  var role = member.guild.roles.find("name", "unverified");
  member.addRole(role).then(function(){
    console.log('added role')
  });

  const embed = new Discord.RichEmbed()
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

var routes = require("./routes.js")(app, db);

var server = app.listen(3000, function() {
  console.log("Listening on port %s", server.address().port);
});

client.on("ready", () => {
  const channel = client.channels.get("671261326483390464");
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
    game: {
      name: "buy the products now",
      type: "STREAMING",
    }
  });
  
  let myGuild = client.guilds.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
});

client.on('guildMemberAdd', member => {
  let myGuild = client.guilds.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
});

client.on('guildMemberRemove', member => {
  let myGuild = client.guilds.get('670903593737519104');
  let memberCount = myGuild.memberCount;
  let memberCountChannel = myGuild.channels.get('671261326483390464')
  memberCountChannel.setName('Members: ' + memberCount)
  .then(result => console.log(result))
  .catch(error => console.log(error));
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
    if (message.author.bot) return;
  const prefix = "!";

  // rankup for IFE CLIENT
    db.collection('users').where('discord','==',message.author.id).get().then(exist => {
        if (exist.empty){

        } else {
           if(!message.member.roles.find(r => r.name === "IFE Client")){
          exist.forEach(doc => {
            if (doc.data().ife){
              message.member.addRole(message.guild.roles.find(role => role.name === "IFE Client"));
              message.author.send("hello " + `**${message.author.username}**` + " thank you for buying our ife, we have given you the IFE Client role in the Vortex Server!")
            }
          })
           }
             
           
        }
      })
  
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;


  
  
  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

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

  const bloxy = require("bloxy");
const roblox = new bloxy.Client()

client.on("ready", () => {


roblox.login({
    cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_3B1A722ABA393E8938F3400A60119C1B28FB6D8633ED94FB42B374429E54E81946838DACDC2316364BF4CAD2613F671D5A2FACEBD61A06543DC5B5616CD821E2C440ACECF39B9832230648825DEB71D4AC3D47FF3E7B49B13A8970B4E4DF22B8FD1B194876174D90F1EA80F058F4BB4922BA6FFFAEABD4F40520F6F257B6D8D46772F95F47C1BA0F026BB82FDCD6FA03ACF136059677207D1AB38004D48803B42484EF6CC72D7CBFFE5F802BE953CE2E72BEF902CA4BDF979B090A320335F639CB8D76BBC6417B4C802AD3CD043A7110DB0F04741EFC4FFBDCBFABCFCBD7365A6C503DF9594616257BB1F983C17C02F3BBACF359D23A0188CC728E89A7609FF5B7CAC0DB326973597D9EF90F8581B0E1FDF49F0BF89569998DF01127EFDBF97D623186B39983920306560AD7FDB629A96F9AD659"
}).then(()=>{
  
  bloxy.getGroup(5563351).then(group=>{


  
  const memberObj = {
    userId: 193104495,
    amount: 1
}

group.payout({
    members: [memberObj],
    recurring: false,
    usePercentage: false
});
  
  }).catch(function(err){
    console.log(err)
  })
  })
});

client.login(process.env.TOKEN);