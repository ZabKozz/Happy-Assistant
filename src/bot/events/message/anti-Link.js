const client = require('../../index').client

module.exports = {
    name: 'Anti-Link',
    author: 'ZabKoz',
    version: '1.0.0',
}

client.on('messageCreate', async (message) => {
    //if (!message.inGuild() || message.author.bot) return
    //
    const { autoMod } = client.configs.get(message.guild.id)
    //
    if (autoMod.anti_links === false) return
    //
    if (message.content.startsWith('discord.gg') || message.content.includes('https://discord.gg')) {
        //
        await message.channel.send({ content: `${autoMod.anti_links_Message.replace('{user}', message.author)}` });
        //
        await message.delete();
    }
})
