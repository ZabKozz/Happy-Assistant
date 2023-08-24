const GuildConfig = require('../../../models/guild');

async function loadGuilds(client) {

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
            console.log('Set configs', guild.id);
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
            await guildConfigDB.save()
        }
    }
    // console.log(client.configs)
}

module.exports = { loadGuilds };