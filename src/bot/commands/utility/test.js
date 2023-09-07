const { EmbedBuilder } = require('discord.js');
const ec = require('@config/embed');

module.exports = {
    name: 'testt',
    name_localizations: {
        pl: 'testy',
        "en-US": 'test',
    },
    description: '🏓 | Multilingualism test command ',
    description_localizations: {
        pl: 'Komenda testowa wielojęzyczności.',
        "en-US": 'Multilingualism test command.',
    },
    botPermissions: [""],
    userPermissions: ["ManageGuild"],
    version: '1.0.0',
    async execute(interaction, client) {
        const locales = {
            pl: 'Poland',
            "en-US": 'English'
        }
       console.log(interaction.locale)

       await interaction.reply({
        content: locales[interaction.locale] ?? "Text"
       })
    }
}