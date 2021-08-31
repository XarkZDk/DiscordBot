const Command = require("../Structures/Command.js")

module.exports = new Command({
   name: "ping",
   description: "Shows the ping of the bot!",
   
   async run (msg, args, client) {
      const _msg = await msg.reply(`Ping: ${client.ws.ping} ms`)
      //message.edit, -> edita el mensaje después de un momento
      _msg.edit(`Ping: ${client.ws.ping} ms \nMessage Ping: ${
         _msg.createdTimestamp - msg.createdTimestamp
      }`)
   }
})