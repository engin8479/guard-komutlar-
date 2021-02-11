const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`modlog_${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if(!logkanal) return message.channel.send(new Discord.MessageEmbed().setDescription(`Modlog Kanalı Zaten ayarlı değil`).setColor("RANDOM"));
    
    db.delete(`modlog_${message.guild.id}`)
   message.channel.send(new Discord.MessageEmbed().setDescription(`ModLog Kanalı başarıyla sıfırlandı`).setColor("RANDOM"));

    return
  }
  
if (!logk) return message.channel.send(new Discord.MessageEmbed().setDescription(`Mod log kanalı olarak ayarlacağım kanalı belirt!`).setColor("RANDOM"));
 

db.set(`modlog_${message.guild.id}`, logk.id)

message.channel.send(new Discord.MessageEmbed().setDescription(`Mod-Log kanalı başarıyla ${logk} olarak ayarlandı`).setColor("RANDOM"));

console.log(`Mod-log komutu ${message.author.username} Tarafından kullanıldı`)
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log','modlog'],
    permLevel: 0 ,
  kategori:'moderasyon'
};

exports.help = {
    name: 'mod-log',
    description: 'Mod-Log kanalını belirler.',
    usage: 'mod-log <#kanal>'
};