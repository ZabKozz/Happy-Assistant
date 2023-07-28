// Module responsible for env configuration operation
require('dotenv').config();
// Discord.js package
const Discord = require('discord.js');
// File responsible for loading events and commands
const { loadEvents, loadCommand } = require('./utils/heandlers');
// Initialize client
const client = new Discord.Client({
    intents: 32767,
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
});
// Event collection
client.events = new Discord.Collection();
// Command collection
client.commands = new Discord.Collection();
// Aliases collection
client.aliases = new Discord.Collection();
// Events loading function
loadEvents(client);
// Command loading function
loadCommand(client);
// Initiation of client login
client.login(process.env.client_Token);
// Export client
exports.client = client;