const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`❌ Bu Komutu Kullana Bilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısın!`)
  let prefix = ayarlar.prefix


  if(args[0] === 'aç') {
    db.set(`capslock_${message.guild.id}`, "aktif")
    message.channel.send(`Caps-engel sistemini başarı ile ayarladım! Yüksek yetkili kişilerin mesajlarını silmeye yetkim olmadığından sistemin çalışıp çalışmadığını sorgulamayın`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`capslock_${message.guild.id}`)
message.channel.send(`Capslock Engel Sistemini başarı ile kapattım!`)
return
}
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslockengel','capslock','capslock-engel','cl','caps-engel'],
  permLevel: 0
};
exports.help = {
  name: 'capsengel',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};