const client = require('../../index').client
const guildLeveling = require('@models/guild-leveling');
const calculateLevelXp = require('../../functions/leveling/calculateLevelXp');

module.exports = {
    name: 'messageCreate-Leveling',
    author: 'ZabKoz',
    version: '1.0.0',
}

client.on('messageCreate', async (message) => {
    if (!message.inGuild() || message.author.bot) return
    //
    const { leveling } = client.configs.get(message.guild.id)
    //
    if (leveling.enabled === false) return
    //
    function getRandomXp(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //
    const xpToGive = getRandomXp(5, 15);
    //
    const data = {
        userID: message.author.id,
        guildID: message.guild.id,
    };
    //
    try {
        //
        const userLeveling = await guildLeveling.findOne(data);
        //
        if (!userLeveling) {
            //
            const User = await guildLeveling.create({
                userID: message.author.id,
                guildID: message.guild.id,
                xp: xpToGive,
                level: 0,
            });
            //
            await User.save();
        }
        else if (userLeveling) {
            //
            userLeveling.xp += xpToGive;
            //
            if (userLeveling.xp > calculateLevelXp(userLeveling.level)) {
                userLeveling.xp = 0;
                userLeveling.level += 1;
                // console.log(userLeveling.level)
            };
            //
            await userLeveling.save();
        }
        // !level
        else {
            //
            const newLevel = new guildLeveling.findOneAndUpdate({
                userID: message.author.id,
                guildID: message.guild.id,
                xp: xpToGive,
            });
            //
            await newLevel.save();
        }
    } catch (error) {
        //
        console.log(error);
    }
})
