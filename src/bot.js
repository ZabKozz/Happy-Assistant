// Discord.js package
const {
    Client,
    GatewayIntentBits,
    Collection,
} = require('discord.js');
// File responsible for loading events and commands
const {
    loadEvents,
    loadCommand
} = require('./utils/heandlers');
// Initialize client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
});
//
client.mongoose = require('./utils/database');
// Event collection
client.events = new Collection();
// Command collection
client.commands = new Collection();
// Guild Configs collection
client.configs = new Collection()
// Command loading function
loadCommand(client);
// Events loading function
loadEvents(client);
// Initiation of client login
client.login(process.env.client_Token);
// Export client
exports.client = client;