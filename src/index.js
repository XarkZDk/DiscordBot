//Token = "Es como la contraseña del bot"
// const { channel } = require('diagnostic_channel')
/** @format */

console.clear()

const fs = require('fs')
const config = require("./Data/config.json")

const Client = require("./Structures/Client.js")
const Command = require("./Structures/Command.js")

const client = new Client()

fs.readdirSync("./src/Commands") // readdir reads from the main dir!!
   .filter(file => file.endsWith(".js"))
   .forEach(file => { 
      /**
       * @type {Command} 
       */
      const command = require(`./Commands/${file}`) 
      console.log(`Command ${command.name} loaded`)
      client.commands.set(command.name,command)
})

client.on('ready', () => {
   console.log(`${client.user.tag} is ready!`) //user.tag -> ver el nombre del usuario (el bot)
   // client.user.setStatus("online") //Cambiar el estado del bot

   // console.log(client.user.presence.status) //Ver el estado del bot
})

client.on("messageCreate", msg => {
   if(msg.author.bot) return;
   if(!msg.content.startsWith(config.prefix)) return; //-> retorna "void"
   
   const args = msg.content.substring(config.prefix.length).split(/ +/) //-> tomamos el mensaje, eliminamos el prefix y lo pasamos a un array
   const command = client.commands.find(cmd => cmd.name == args[0]) //-> verificamos si existe alguna carpeta con el comando escrito

   if(!command) return msg.reply(`"${args[0]}" isn't a valid command!`) //Si es que no existe carpeta, se envía este mensaje
   command.run(msg, args, client) 
})

client.login(config.token)


