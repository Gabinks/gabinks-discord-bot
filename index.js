const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "!/";

Client.on("ready", () => {
    console.log("Ready!");
    Client.user.setStatus("online");
    setTimeout(() =>{
        Client.user.setActivity("discord.io/commufrrl", {
            type: "STREAMING",
            url: "https://www.twitch.tv/gabinbinks"
        });
    }, 100)
    
});

Client.on("message", msg => {
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;

    if(msg.content.startsWith(prefix + "helpadmin")){
        if(msg.member.hasPermission("ADMINISTRATOR")){
            const helpadminEmbed = new Discord.MessageEmbed()
        .setColor('#5366AD')
        .setTitle('Les commandes du bot')
        .setDescription('Pour chaque commande un exemple sera montré, vous aurez juste a changer les valeurs !')
        .setAuthor('Communauté Française RL', 'https://i.imgur.com/ErIMkfx.png')
        .setThumbnail('https://i.imgur.com/ErIMkfx.png')
        .addFields(
            { name: '\u200B', value: '\u200B' },
            { name: 'Pour ban un membre :', value: '!/ban **@Gabinks**' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Pour kick un membre :', value: '!/kick **@Gabinks**' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Pour mute un membre :', value: '!/mute **@Gabinks**' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Pour temp mute un membre (**en secondes!**) :', value: '!/tempmute **@Gabinks** __5__' },
            { name: '\u200B', value: '\u200B' },
        )
        .setTimestamp()
	    .setFooter('Communauté Française RL', 'https://i.imgur.com/ErIMkfx.png');
    msg.reply(helpadminEmbed);
        }
        
    }

    if(msg.content.startsWith(prefix + "report")){
        let mention = msg.mentions.members.first();
    
        if (!mention == undefined || !args == undefined){
            msg.author.send("Pour report un joueur veuillez préciser le nom du joueur et la raison Exemple : !/report @Gabinks Insule");
        }
        let args = msg.content.split(' ').splice(2).join(' ');
        channel = Client.channels.cache.get('866009504054509578');
        channel.send("<@" + msg.author.id + "> a **report** <@" + mention.id + "> pour " + "__"+args+"__");
    }

    if(msg.member.hasPermission("ADMINISTRATOR")){
        if(msg.content.startsWith(prefix + "ban")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    msg.channel.send(mention.displayName + " a été banni avec succès");
                }
                else {
                    msg.reply("Impossible de bannir ce membre!");
                }
            }
        }
        else if(msg.content.startsWith(prefix + "kick")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Membre non ou mal mentionné.");
            }
            else{
                if(mention.kickable){
                    mention.kick();
                    msg.channel.send(mention.displayName + " a été kick avec succès");
                }
                else{
                    msg.reply("Impossible de kick ce membre.")
                }
            }
        }
        else if(msg.content.startsWith(prefix + "mute")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Membre non ou mal mentionné")
            }
            else{
                mention.roles.add("865960236841041940");
                msg.channel.send(mention.displayName + " mute avec succès.")
            }
        }
        else if(msg.content.startsWith(prefix + "unmute")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Membre non ou mal mentionné");
            }
            else{
                mention.roles.remove("865960236841041940");
                msg.channel.send(mention.displayName + " unmute avec succès.");
            }
        }
        else if(msg.content.startsWith(prefix + "tempmute")){
            let mention = msg.mentions.members.first();

            if(mention == undefined){
                msg.reply("Membre non ou mal mentionné");
            }
            else{
                let args = msg.content.split(" ");

                mention.roles.add("865960236841041940");
                msg.channel.send(mention.displayName + " a été mute pendant " + args[2] + " secondes avec succès !");
                setTimeout(function(){
                    mention.roles.remove("865960236841041940");
                    msg.channel.send("<@" + mention.id + "> a été unmute!");
                }, args[2] * 1000);
            }
        }
        //Clear command
        else if (msg.content.startsWith(prefix + "clear")){
            let args = msg.content.split(" ");
            let nbr = args[1];

            if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Vous n'avez pas la permission requise");
            if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Je n'ai pas la permission requise!");
            if (!nbr) return msg.channel.send("Veuillez indiquer le nombre de message à supprimer.");
            if (isNaN(nbr)) return msg.channel.send("Veuillez indiquer le nombre de message à supprimer.");
            if (nbr < 1 || nbr > 100) return msg.channel.send("Vous devez indiquer un nombre entre 1 et 100.")

            msg.delete().then(msg => {
                msg.channel.bulkDelete(nbr, true).then(messages => {
                    msg.channel.send(":wastebasket: <@" + msg.author + ">, Vous avez supprimé " + messages.size + " message(s).");
                })
            })
        };
    }
});

Client.login(process.env.TOKEN);