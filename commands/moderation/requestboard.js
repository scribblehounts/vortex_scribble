module.exports = {
  name: "requestboard",
  category: "moderation",
  description: "To request an board meeting",
  run: async (client, message, args) => {
    if (message.author.bot) return;
    if (!message.guild.me.hasPermission("ADMINSTRATOR")) {
      message.guild.createChannel("board-meeting", "text")
  .then(channel => {
    let category = message.guild.channels.find(c => c.name == "support" && c.type == "category");
    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
         channel.overwritePermissions(message.guild.id, {
        VIEW_CHANNEL: false,
           SEND_MESSAGES: false,
    })

    channel.overwritePermissions(message.author.id, {
        VIEW_CHANNEL: true,
                 SEND_MESSAGES: true
    })
      }
  }
};
