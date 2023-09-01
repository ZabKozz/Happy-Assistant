const { CommandInteraction } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    author: 'ZabKoz',
    version: '1.0.1',
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {

        if (!interaction.guild) {
            return interaction
                .reply({ content: "Command can only be executed in a discord server", ephemeral: true })
                .catch(() => { });
        }
        //
        else if (interaction.isCommand() || interaction.isChatInputCommand()) {
            //
            const command = client.commands.get(interaction.commandName);
            //
            if (interaction.member.permissions.has(command.userPermissions)) {
                //
                command.execute(interaction, client);
            }
            else {
                //
                return interaction
                    .reply({ content: "You don't have the right credentials", ephemeral: true })
                    .catch(() => { });
            }

        }
    }
}
