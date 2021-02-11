const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(` Bu komudu kullanabilmek için **Mesajları yönet** yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`Merhaba eğer reklam engel filtresini açmak isterseniz aç kapatmak isterseniz kapat yazın`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`Merhaba eğer reklam engel filtresini açmak isterseniz aç kapatmak isterseniz kapat yazın`)

    if (args[0] == 'aç') {
    db.set(`reklamFiltre_${message.guild.id}`, 'aktif')
    let i = await db.fetch(`reklamFiltre_${message.guild.id}`)
  message.channel.send(`Reklam engel başarı ile açıldı.`)    
     
  } 

  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`reklamFiltre_${message.guild.id}`)
    if (!üye) return message.channel.send(`Bu özellik zaten kapalı.`)
    
    
    db.delete(`reklamFiltre_${message.guild.id}`)
    
    message.channel.send(`Reklam engel sistemini kapattım.`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ['link','reklam'],
 permLevel: 0
};

exports.help = {
 name: 'reklam-engel',
 description: 'reklamm',
 usage: 'gkanal'
};