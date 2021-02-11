const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(` Bu komudu kullanabilmek için **Mesajları yönet** yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`Merhaba eğer küfür engel sistemini açmak isterseniz aç kapatmak isterseniz kapat yazın`)
  if (args[0] !== 'aç' && args[0] !== 'kapat') return message.channel.send(`Merhaba eğer küfür engel sistemini açmak isterseniz aç kapatmak isterseniz kapat yazın`)

    if (args[0] == 'aç') {
    db.set(`küfürengel_${message.guild.id}`, 'aktif')
    let i = await db.fetch(`küfürengel_${message.guild.id}`)
  message.channel.send(`Küfür engel açıldı.`)    
     
  } 

  if (args[0] == 'kapat') {
    
    let üye = await db.fetch(`küfürengel_${message.guild.id}`)
    if (!üye) return message.channel.send(`Bu özellik zaten kapalı.`)
    
    
    db.delete(`küfürengel_${message.guild.id}`)
    
    message.channel.send(`Küfür engel kapatıldı.`)
  }
 
};


exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'küfür-engel',
 description: 'reklamm',
 usage: 'gkanal'
};