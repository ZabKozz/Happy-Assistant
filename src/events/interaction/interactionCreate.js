const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    author: 'ZabKoz',
    version: '1.0.0',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName)

            if (!command) return

            command.execute(interaction, client)
        }
    }
}
