const Discord = require ('discord.js');

const client = new Discord.Client();

var prefix = "+";

client.login("process.env.TOKEN");

client.on ("ready", () => {
    console.log("Je suis connecté et opérationnel !")
    client.user.setGame("Programmer moi-même");
});

client.on('message', message => {

if(message.content === "Bonjour"){
    message.reply ("Salut mon pote ça roule ?");
    console.log('Le bot dit Salut mon pote ça roule ?')
}

if(message.content === prefix + "aide"){
    var help_embed = new Discord.RichEmbed()
    .setColor("#3333FF")
    .setTitle("Voici mon aide ! :)")
    .setThumbnail(message.author.avatarURL)
    .setDescription("Je suis Bot RPG pour vous amuser, voici mes commandes:")
    .addField("+aide", "Affiche l'aide du bot")
    .addField("Bonjour", "Permets de discuter avec le bot")
    .addField("+stats", "Le bot vous donne quelques stats de votre compte")
    .addField("+infos", "Quelques infos sur le serveur")
    .addField("+kick", " Pour kick un intrus")
    .addField("+ban", "Pour bannir un intrus")
    .addField("+clear", "Pour clear un certains nombre de messages")
    .setFooter("Menu d'aide BotRPG")
    message.channel.sendMessage(help_embed);
    console.log("Un joueur à demandé la liste d'aide")
}

if(message.content.startsWith(prefix + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas le droit d'utiliser cette commande !");
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner quelqu'un")
    }
    var kick = message.guild.member(message.mentions.user.first());
    if(!kick) {
        return message.channel.send("Je ne sais pas si l'utilisateur existe")
}
if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.channel.send("Je n'ai pas la permission pour cela");
}

kick.kick().then(member => {
    message.channel.send(`${member.user.username} est kick par ${message.author.username}`)
});
}

if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas le droit d'utiliser cette commande !");
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner quelqu'un")
    }
    var ban = message.guild.member(message.mentions.user.first());
    if(!ban) {
        return message.channel.send("Je ne sais pas si l'utilisateur existe")
}
if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
    return message.channel.send("Je n'ai pas la permission pour cela");
}

ban.ban().then(member => {
    message.channel.send(`${member.user.username} est banni par ${message.author.username}`)
});
}

if(message.content.startsWith(prefix + "clear")){
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande !");
    
    let args = message.content.split(" ").slice(1);
    
    if(!args[0]) return message.channel.send("Vous n'avez pas précisé le nombre de messages à supprimer !")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages ont été supprimés !`);
    })
}

if (message.content.startsWith(prefix + "mute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner un joueur");
    
    }
 var mute = message.guild.member(message.mentions.users.first());
 if(!mute) {
     return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas");
 }

if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission");
message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
    message.channel.send(`${mute.user.username} est mute`);
})
}

if (message.content.startsWith(prefix + "unmute")) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");
    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner un joueur");
    
    }
 var mute = message.guild.member(message.mentions.users.first());
 if(!mute) {
     return message.channel.send("Je n'ai pas trouvé l'utilisateur ou il n'existe pas");
 }

if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission");
message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
    message.channel.send(`${mute.user.username} n'est plus mute`);
})
}

//NE PAS OUBLIER LES PREREQUIS DANS LA VIDEO :
 
var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
 
if (message.content.startsWith(prefix + "warn")){
 
if (message.channel.type === "dm") return;
 
var mentionned = message.mentions.users.first();
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
if(message.mentions.users.size === 0) {
 
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
 
}else{
 
    const args = message.content.split(' ').slice(1);
 
    const mentioned = message.mentions.users.first();
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          if (args.slice(1).length != 0) {
 
            const date = new Date().toUTCString();
 
            if (warns[message.guild.id] === undefined)
 
              warns[message.guild.id] = {};
 
            if (warns[message.guild.id][mentioned.id] === undefined)
 
              warns[message.guild.id][mentioned.id] = {};
 
            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;
 
            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){
 
              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};
 
            } else {
 
              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),
 
                time: date,
 
                user: message.author.id};
 
            }
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
message.delete();
 
            message.channel.send(':anger: | **'+mentionned.tag+' à été averti** :anger:');
 
message.mentions.users.first().send(`:anger: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** :anger: ` + args.slice(1).join(' '))
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
}
 
 
 
  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
    const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size !== 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {
 
          try {
 
            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
              return;
 
            }
 
          } catch (err) {
 
            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");
 
            return;
 
          }
 
          let arr = [];
 
          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");
 
          for (var warn in warns[message.guild.id][mentioned.id]) {
 
            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+
 
            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");
 
          }
 
          message.channel.send(arr.join('\n'));
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
          console.log(args);
 
        }
 
      } else {
 
        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }
 
 
 
 
 
  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {
 
if (message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);
 
   const mentioned = message.mentions.users.first();
 
    const args = message.content.split(' ').slice(1);
 
    const arg2 = Number(args[1]);
 
    if (message.member.hasPermission('MANAGE_GUILD')){
 
      if (message.mentions.users.size != 0) {
 
        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){
 
          if (!isNaN(arg2)) {
 
            if (warns[message.guild.id][mentioned.id] === undefined) {
 
              message.channel.send(mentioned.tag+" n'a aucun warn");
 
              return;
 
            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {
 
              message.channel.send("**:x: Ce warn n'existe pas**");
 
              return;
 
            }
 
            delete warns[message.guild.id][mentioned.id][arg2];
 
            var i = 1;
 
            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){
 
              var val=warns[message.guild.id][mentioned.id][key];
 
              delete warns[message.guild.id][mentioned.id][key];
 
              key = i;
 
              warns[message.guild.id][mentioned.id][key]=val;
 
              i++;
 
            });
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {
 
              delete warns[message.guild.id][mentioned.id];
 
            }
 
            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);
 
            return;
 
          } if (args[1] === "tout") {
 
            delete warns[message.guild.id][mentioned.id];
 
            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});
 
            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);
 
            return;
 
          } else {
 
            message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
          }
 
        } else {
 
          message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
        }
 
      } else {
 
       message.channel.send("Erreur mauvais usage: "+prefix+"clearwarns <utilisateur> <nombre>");
 
      }
 
    } else {
 
      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");
 
    }
 
  }

if(message.content === prefix + "infos") {
    var infos_embed = new Discord.RichEmbed()
    .setColor("#3333FF")
    .setTitle("Les infos du BotRPG")
    .addField(":robot: Nom:", `${client.user.tag}`, true)
    .addField("Decriminateur du bot :hash:" , `#${client.user.discriminator}`)
    .addField("ID du bot :id: " , `${client.user.id}` )
    .addField("Nombre de joueurs", message.guild.members.size)
    .addField("Nombre de salons", message.guild.channels.size)
    .addField("Nombre de rôles", message.guild.roles.size)
    .setFooter("Infos - serveur+bot")
    message.channel.sendMessage(infos_embed)
    console.log("Un joueur à utilisé la commande +infos")
    
}






if (!message.content.startsWith(prefix)) return;

var args = message.content.substring(prefix.length).split(" ");

switch (args[0].toLowerCase()) {
    case "stats":

    var userCreateDate = message.author.createdAt.toString().split(" ");
    var msgauthor = message.author.id;
    var stats_embed = new Discord.RichEmbed()

    .setColor("#3333FF")
    .setTitle(`Statistiques de l'utilisateur: ${message.author.username}`)
    .addField(`ID de l'utilisateur :id:` , msgauthor, true)
    .addField("Date de création du joueur: " , userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
    .setThumbnail(message.author.avatarURL)
    message.reply("Je te donne les statistiques de ton compte tout de suite")
    message.reply({embed: stats_embed});
    break;
}
});
 
