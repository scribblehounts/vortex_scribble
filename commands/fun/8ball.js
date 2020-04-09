module.exports = {
  name: "8ball",
  category: "fun",
  description: "To request an 8ball",
  run: async(client,message,args) => {
    if (message.author.bot) return;
    if(!args[2]) return message.reply("Ask a question!");
    let replies = ["Yes","Perhaps","Most Likely","Unlikely","No","Ask again later","If I tell you, you wouldn't believe me"];
    
    let result = Math.floor((Math.random()* replies.length));
    let question = args.slice(1).join(" ");
    
    message.reply(replies[result])
  }
}