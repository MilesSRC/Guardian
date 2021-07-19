// Initalize dotenv to get the user provided variables.
require('dotenv').config();

/**
 * Initialize Discord.js + Client
 */
const discord = require('discord.js');
const client = new discord.Client();

// Let's get some modules to help us with tasks
const fs = require('fs'); // File System

// Setup some variables that are set by the owner of the bot
const bot = process.env;

// Set activity status
client.on('ready', () => {
    // Set a function for it so the code is cleaner.
    // - Set the activity to be set every 2 minutes. Discord's API sometimes messes up and resets the status, so we call it every once and a while.
    const setActivity = () => client.user.setActivity({ type: "LISTENING", name: "Fiverr" });
    setInterval(setActivity, 5 * 60000);
    setActivity(); // We call it once to ensure it runs as the bot starts up.

    // let's log to the console that the bot has started.
    console.log(`${bot.name} has started! :)`)
})

// Set up commands
client.on('message', (message) => {
    // First understand whose sending the message.
    // We want to make sure a bot isnt trying to issue a command to prevent command loops.
    if(message.author.bot)
        return;
    
    // Now, we want to understand the users intent, are they trying to contact us or just send a message?
    if(!message.content.startsWith(bot.prefix))
        return;

    // Alright, their message starts with our prefix. Its safe to assume they're trying to contact the bot. Lets see what they need.
    const command = message.content.split(bot.prefix)[1].split(" ")[0];
    const args = message.content.split(" ").slice(1);

    // Lets see if we have a command that they need.
    var exists = fs.existsSync(`${__dirname}/commands/${command}.js`);
    if(!exists)
        return;

    // Let's start a try block.
    // This will ensure clean collection of errors. (If any)
    try {
        // Require the command and execute it. Pass over the bots client, the message, and the messages arguments.
        var action = new (require(`${__dirname}/commands/${command}`));
        action.execute(client, message, args);
    } catch (err) {
        // Uh oh! An error occured. Lets report it.
        console.error(err);
    }
})

client.login(bot.token);