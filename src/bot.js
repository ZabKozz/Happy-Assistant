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
// Guild model //
// Initialize client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
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
// Aliases collection
client.aliases = new Collection();
client.configs = new Collection()
// Events loading function
loadEvents(client);
// Command loading function
loadCommand(client);
// Initiation of client login
client.login(process.env.client_Token);
// Export client
exports.client = client;