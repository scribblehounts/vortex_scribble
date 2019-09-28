 module.exports = (bot) => {
        bot.extractDate = (dateObj) => {
        let month = dateObj.getMonth()
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        return {
          month: month + 1,
          day: day,
          year: year
        }
      }
    };