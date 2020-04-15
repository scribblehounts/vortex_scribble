module.exports = {
  name: "purge",
  category: "moderation",
  description: "To purge messages",
  run: async (client, message, args) => {
    if (message.author.bot) return;
    var args = message.content.split(/[ ]+/);
    if (message.member.roles.cache.some(role => role.name === "Mod")) {
      if (args[1] > 100)
        return message.channel.send(`**Please send a number less than 100**`);

      message.channel.bulkDelete(args[1]);
    }
  }
};
