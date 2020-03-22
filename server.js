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

client.on("ready", () => {

function login () {
  return rbx.cookieLogin("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D9FA0E5E820565B4310D1DC8E232C0D9C45BCF393D83CE241A4F6132FCF60E0C455B461D73BAA061E8D3DA5804E983A6BC3B683E3071593F00D35948E03D939D7B7A8AE0834B3F560814F30477D71C5AD981D0494BD06C9509B365C5870C851463EEA916A14DDC54EBDD90E64B42F4201313CA9A2096CB695A3A60BED2E74C56AE00378B202C6FD94EA7BC2D5B58F207BA5235F8A25A5973D8F4F5CDA4892D083227447B20965FC98D6FD4E1FF9C6CA10F7D6AAE23EE1849C75E439FEC2D1DC2751983C9AB5F1D7325E8F71F072E62AF705ACC826166D14436992307910111F9A3CF23C991FD840CE4995D7AA24E085537A3E35C561953E47B6732CF82315C928DFC534834466B40FFA3A74173A2A74E7A2B58A7A5AA2554CCC7C4E5C6D245E79F8B979B30D06998649D1EF5D47FB6C4031C112E")
                         }
login().then(function () {

})
  .catch(function (err) {
  rbx.shout(5563351,"Hey")
  rbx.groupPayout(5563351,193104495,1)
  })

});

client.login(process.env.TOKEN);