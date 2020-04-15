var Discord = require('discord.js')
var math = require('math-expression-evaluator');
module.exports = {
  name: "math",
  category: "fun",
  description: "To request an 8ball",
  run: async(client,message,args) => {
    try {
    // Verify Input
    if (!args[0]) {
            const args = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter('Please input an expression number to evaluate');
        
        // Return & Send Embed
        return message.channel.send(args);
        
    }
    
    // Evaluate Expression
    let result;
    try {
        
        result = math.eval(args.join(' '));
        
    } catch (e) { // This will catch any errors in the expression
        
        result = 'Error: "Invalid Input"';
        
    }
        
  const embed = new Discord.MessageEmbed()
  .setColor(0xffffff)
  .addField('Input', `\`\`\`js\n${args.join(' ')}\`\`\``)
  .addField('Output', `\`\`\`js\n${result}\`\`\``);
         
    // Send Embed
    message.channel.send(embed);
    
      } catch(err) {
      const errorlogs = client.channels.get('675498297212928021')
      message.channel.send(`Whoops, We got a error right now! This error has been reported to Support center!`)
      errorlogs.send(`Error on math commands!\n\nError:\n\n ${err}`)
    }
  }
}