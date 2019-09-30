module.exports = {
  name: "buy",
  category: "market",
  description: "To purchase an item",
  run: async(client, message, args) => {
if (message.author.bot) return;
    message.delete()
    message.author.send("You have requested to purchase.")
  }
}