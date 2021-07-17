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
    }
    
});

Client.login(process.env.TOKEN);