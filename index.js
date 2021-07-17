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

    if(msg.content.startsWith(prefix + "help")){
        const helpEmbed = new Discord.MessageEmbed()
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
    msg.reply(helpEmbed);
    }

    if(msg.content.startsWith(prefix + "report")){
        let mention = msg.mentions.members.first();

        if(mention == undefined){
            if(args[2 == undefined]){
                msg.author.send("Pour report un joueur veuillez préciser le nom du joueur et la raison Exemple : !/report @Gabinks Insule");
            }
        }else{
            let args = msg.content.split(' ').splice(2).join(' ');

            channel = Client.channels.cache.get('866009504054509578');

            channel.send("<@" + msg.author.id + "> a **report** <@" + mention.id + "> pour " + "__"+args+"__");
        }
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
    }
});

Client.login(process.env.TOKEN);