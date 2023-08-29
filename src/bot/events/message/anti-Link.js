const client = require('../../index').client

module.exports = {
    name: 'Anti-Link',
    author: 'ZabKoz',
    version: '1.0.0',
}

client.on('messageCreate', async (message) => {
    //if (!message.inGuild() || message.author.bot) return
    //
    const { anti_linkToogle, anti_linkMessage } = client.configs.get(message.guild.id)
    //
    if (anti_linkToogle === 'false') return
    //
    if (message.content.startsWith('discord.gg') || message.content.includes('https://discord.gg')) {
        //
        await message.channel.send({ content: `${anti_linkMessage.replace('{user}', message.author)}` });
        //
        await message.delete();
    }
})
