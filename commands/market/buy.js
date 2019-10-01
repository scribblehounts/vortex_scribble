


module.exports = {
  name: "redeem",
  category: "market",
  description: "To redeem an item",
  run: async(client, message, args) => {
if (message.author.bot) return;
    message.delete()
    message.author.send("You have requested to purchase.")
  }
}