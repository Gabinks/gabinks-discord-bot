const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "!/";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("message", msg => {
    if(msg.author.bot) return;
    if(msg.channel.type == "dm") return;

    if(msg.content.startsWith(prefix + "ping")){
        msg.reply("pong");
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
                msg.channel.send(mention.displayName + " a été mute pendant " + args[2] + " avec succès !");
                setTimeout(function(){
                    mention.roles.remove("865960236841041940");
                    msg.channel.send("<@" + mention.id + "> a été unmute!");
                }, args[2] * 1000);
            }
        }
    }
    
});

Client.login(process.env.TOKEN);