///burayı botun mainine ekleyin çalışmaz yoksa
////////////////kanalkoruma
client.on("channelDelete", async function(channel) {
    let exay = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (exay) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})
///////rolkoruma
client.on("roleDelete", async role => {
  let rol = await db.fetch(`rolk_${role.guild.id}`);
  if (rol) { 
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Rol koruma açık olduğundan yetkili tarafından silinen rol tekrar açıldı.'})
  }
})
////////////////modlogbaşlangıç///////////////////////////
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.MessageEmbed()
                    .addField(`Bir kanal oluşturuldu`, ` Kanal ismi ${channel.name} \n kanal türü: ${channel.type} \n Kanal idi: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.cache.get(db.fetch(`modlog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.MessageEmbed()
                    .addField(`Bir kanal silindi`, ` İsmi: ${channel.name} \n türü: ${channel.type} \n idi: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL())

    c.send(embed)
});



client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: ${emoji.name} \n gif: ${emoji.animated} \n idi: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.cache.get(db.fetch(`modlog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.MessageEmbed()
                    .addField(`Emoji silindi`, ` İsmi: ${emoji.name} \n gif: ${emoji.animated} \n idi: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL())

    c.send(embed)
    });


client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Bir Rol oluşturuldu`, ` ismi: ${role.name} \n idi: ${role.id} \n rengi: ${role.hexColor}`)                    
.setTimestamp()
.setColor("RANDOM")
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.cache.get(db.fetch(`modlog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.MessageEmbed()
.addField(`Bir Rol silindi`, ` ismi: ${role.name} \n idi: ${role.id} \n rengi: ${role.hexColor}`)                    
.setTimestamp()
.setColor("RANDOM")
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL())

    channel.send(embed)
})
///////////////modlogsonuuu///////////////////////////
////////küfürengel
client.on("messageUpdate", msg => {
  const exay = db.fetch(`$küfürengel_{msg.guild.id}`);
  if (exay) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "piç",
      "orospu çocuğu",
      "orospu",
      "oruspu"
    ]; ////////siz devamını getirin :3
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Bu Sunucuda küfür engel filtresi açıktır izin vereceğimi sanıyorsan yanılıyorsun!")
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!exay) return;
});
/////////reklam engel
client.on("message", async msg => {
  if (msg.author.bot) return;

  let exay = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (exay == "aktif") {
    const reklam = ["https://", "http://", "discord.gg",".gg/",".gg","http","https://","com",".com",".xyz",".gov",".org","org",".tr","tr","html","css","ejs",".ejs",".html",".css","reklam"];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak! Rekla kelimesini ağzınıza bile almayın :3`)
            .then(msg => msg.delete(10000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!exay) return;
});
///////////capsengel
 client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`büyükharfkoruma_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, Bu sunucuda büyük harf koruma sistemi aktiftir!`).then(exay => exay.delete({timeout: 3000}))
              
          }
        }
      }
    }
  }
});