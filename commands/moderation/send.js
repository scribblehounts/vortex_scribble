
module.exports = {
  name: "send",
  category: "moderation",
  description: "To send an bot message",
  run: async(client, message, args) => {
if (message.author.bot) return;
    message.delete()
    
var message = message.channel.send("test message");
    const filter = (reaction, user) => reaction.emoji.name === ':ok_hand:' //whatever emote you want to use, beware that .await.Reactions can only check a singel emote
    message.then(m=>{m.awaitReactions(filter, { max: 1})
        .then(collected => {
            console.log("do what ever");
            m.delete();//such as this
        })
        .catch(console.error);
     });
  }
}