const Discord = require("discord.js");

const Client = new Discord.Client;

const prefix = "µ";

Client.on("ready", () => {
    console.log("bot opérationnel");
});

Client.on("message", msg => {
    if(msg.author.bot) return;

    if(msg.content == prefix + "ping"){
        msg.channel.send("pong");
    }

    if(msg.content == prefix + "stat"){
        msg.channel.send(msg.author.username + " qui a pour identifiant : " + msg.author.id + " a posté un message");
    }
    
});

Client.login(process.env.TOKEN);