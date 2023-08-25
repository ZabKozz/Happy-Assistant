const GuildConfig = require('../../../models/guild');
const chalk = require('chalk');

async function loadGuilds(client) {
    //
    const guilds = client.guilds.cache.map(guild => {
        return guild;
    });
    //
    for (const guild of guilds) {
        //
        const guildID = guild.id;
        //
        const guildConfigDB = await GuildConfig.findOne({ guildID });
        //
        if (guildConfigDB) {
            //
            client.configs.set(guildID, guildConfigDB);
            //
            console.log(`[${chalk.green.bold('Config')}]`, chalk.gray('Guild configurations uploaded:', guildID));
            //
        } else {
            //
            const newGuild = {
                guildID: guild.id,
                ownerID: guild.ownerID,
            };
            //
            client.configs.set(guildID, newGuild);
            //
            const guildConfigDB = await GuildConfig.create({
                guildID: guild.id,
                ownerID: guild.ownerId,
            });
            //
            await guildConfigDB.save().then(guildID => {
                console.log(`[${chalk.green.bold('Config')}]`, chalk.gray('New guild configuration added:', guild.id));
            })

        }
    }
    console.log(`[${chalk.blue.bold('Config')}]`, chalk.gray('Saved guild configurations:', chalk.blue(client.configs.size)));
}

module.exports = { loadGuilds };