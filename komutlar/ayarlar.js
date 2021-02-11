const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
  
  let rolkoruma = await db.fetch(`rolk_${message.guild.id}`)
  let kanalkoruma = await db.fetch(`kanalk_${message.guild.id}`)
  let capsengel = await db.fetch(`capslock_${message.guild.id}`)
  let reklamengel = await db.fetch(`reklamFiltre_${message.guild.id}`)
  let küfürengel = await db.fetch(`küfürengel_${message.guild.id}`)

  
  let kontrol2;
  if(rolkoruma == null) kontrol2 = ':x:'
  else kontrol2 = ':white_check_mark: | '+ rolkoruma
  
  let kontrol3;
  if(kanalkoruma == null) kontrol3 = ':x:'
  else kontrol3 = ':white_check_mark: | '+ kanalkoruma

  let kontrol6;
  if(reklamengel == null) kontrol6 = ':x:'
  else kontrol6 = ':white_check_mark: | '+ reklamengel

 let kontrol7;
  if(küfürengel== null) kontrol7 = ':x:'
  else kontrol7 = ':white_check_mark: | '+ küfürengel
  
  let kontrol4;
  if(capsengel == null) kontrol4 = ':x:'
  else kontrol4 = ':white_check_mark: | '+ capsengel
  let ayarlar = new Discord.MessageEmbed()
  .setTitle('Sunucu Anti-raid ayarları')
  .setDescription('İşte ayarlar!')
  .addField('Göstergeler', ':white_check_mark: : **Aktif** \n :x: : **Devre Dışı**')
  .addField('Rol koruma::', kontrol2, true)
  .addField('Kanal koruma:', kontrol3, true)
  .addField('Caps engel:', kontrol4, true)
  .addField('Reklam engel:', kontrol6, true)
  .addField('Küfür engel:', kontrol7, true)
  message.channel.send(ayarlar)
 

 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'koruma-ayarlar',
  description: 'boş', 
  usage: 'antiraid'
};