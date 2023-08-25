const {CommandInteraction} = require('discord.js');

module.exports = {
    name: '',
    description: 'ping',
    permission: '',

    execute(interaction) {
        interaction.reply({ content: 'PONG'})
    }
}