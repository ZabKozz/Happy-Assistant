const GuildConfig = require('../../../models/guild');
const chalk = require('chalk');

// Function responsible for loading server configurations
async function loadGuilds(client) {
    // Search for all servers on which there is a bot
    const guilds = client.guilds.cache.map(guild => {
        return guild;
    });
    // Loop 
    for (const guild of guilds) {
        // Variable storing the server id
        const guildID = guild.id;
        // Searching for a server in the database
        const guildConfigDB = await GuildConfig.findOne({ guildID });
        // If the server is located in a database
        if (guildConfigDB) {
            // Saving the server in the "clinet.configs" collection
            client.configs.set(guildID, guildConfigDB);
            // Display of information about the server being saved in the "clinet.configs" collection
            console.log(`[${chalk.green.bold('Config')}]`, chalk.gray('Guild configurations uploaded:', guildID));
            // If the server is not in the database
        }
        else {
            // Storage of basic server data such as id and owner id
            const newGuild = {
                guildID: guild.id,
                ownerID: guild.ownerID,
            };
            // Saving the server in the "clinet.configs" collection
            client.configs.set(guildID, newGuild);
            // Creating a new server in the database
            const guildConfigDB = await GuildConfig.create({
                guildID: guild.id,
                ownerID: guild.ownerId,
            });
            // Saving the new server in the database
            await guildConfigDB.save().then(guildID => {
                // Display of information that a new server has been added and saved in the "clinet.configs" collection
                console.log(`[${chalk.green.bold('Config')}]`, chalk.gray('New guild configuration added:', guild.id));
            });

        }
    }
    // Display of how many server configurations the bot has loaded
    console.log(`[${chalk.blue.bold('Config')}]`, chalk.gray('Saved guild configurations:', chalk.blue(client.configs.size)));
}
// Exporting all functions
module.exports = { loadGuilds };