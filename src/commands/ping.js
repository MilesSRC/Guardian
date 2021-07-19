// Required Classes
const Command = require('../lib/Command');
const Discord = require('discord.js');

// Get the variables provided by the bot owner
const bot = process.env;

// Register the ping command
class PingCommand extends Command {
    constructor(){
        // Open Command Class into PingCommand class
        super();

        // Describe the command
        this.name = "Ping";
        this.description = "Pings the bot!";
        this.usage = `${bot.prefix}ping`;
    }

    // The commands executor, this is run anytime the command is called on.
    execute(client, message, args){
        // Start an embed
        const embed = new Discord.MessageEmbed();
        embed.setTitle(":ping_pong: Hello! I'm here.");
        embed.setDescription(`:heartbeat: ${client.ws.ping}ms
        :incoming_envelope: ${message.createdAt - Date.now()}ms`);
        embed.setColor(bot.primary_color);
        embed.setFooter("Your server is protected by Guardian.");

        // Send the embed.
        message.channel.send(embed);
    }
}

// Export Command
module.exports = PingCommand;