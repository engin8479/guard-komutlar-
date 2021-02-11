const Discord = require('discord.js')
 
exports.run = async (client ,message, args) =>{

  
  const exay = new Discord.MessageEmbed()
  .setTitle("Exay ping")
  .setColor("GREEN")
  .setDescription(`pingim: ${client.ws.ping} ms`)
  message.channel.send(exay)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ping'],
 permLevel: 0
};
 
exports.help = {
 name: 'ping',
 description: 'ping',
 usage: '-ping'
};