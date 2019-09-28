const discord = require("discord.js")
const roblox = require("noblox.js") 

const fs = require("fs")
const bot = new discord.Client();

const token = ('NjI3NDA3MDU1MTk1NjAyOTQ0.XY8MbA.EX0bdUCr8SzwTOiS-wYBziMH2is')

bot.on('ready', () =>{
    console.log('Im alive!')
    bot.user.setStatus('available')
bot.user.setActivity("playing with joe mama")
})

require("./modules/functions.js")(bot);
    // sends bot to the cmd folder where cmds are stored, yknow, to keep index clean :D
    // insert your commands in a folder called cmds
    fs.readdir("./cmds/", (err, files) => { 
        if(err) { return console.error(err) };
        // allow the files to be detectable by glitch, pop the "." so it can be read
        let jsfiles = files.filter(f => f.split(".").pop() === "js")
        if(jsfiles.length <= 0) {
            // log in console if no cmds are present
            console.log("No commands are present.") 
            return
        }

        console.log(`Loading ${jsfiles.length} js files.`) 

        jsfiles.forEach((f, i) => {
            let props = require(`./cmds/${f}`)
            bot.commands.set(props.help.name, props)
            console.log(`${i + 1}: ${f} loaded!`) // loaded
        })
    })

bot.login(token);