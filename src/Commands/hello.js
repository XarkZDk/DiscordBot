const Command = require("../Structures/Command.js")

module.exports = new Command({
   name:"hello",
   description:"A simple greeting",

   async run(msg, args, client) {
      msg.reply("Hello!")
   }
})