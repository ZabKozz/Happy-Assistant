const { EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const guildConfigDB = require('@models/guild-configuration');
const ec = require('@config/embed');

module.exports = {
    name: 'leveling',
    description: '🔐 | Leveling system',
    botPermissions: [""],
    userPermissions: ["ManageGuild"],
    version: '1.0.1',
    options: [
        {
            name: "setup",
            description: "Settings to enable the leveling system.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "enabled",
                    description: "(True = Enable / False = Disable)",
                    type: ApplicationCommandOptionType.Boolean,
                    required: true,
                },
            ],
        },
        {
            name: "channel",
            description: "Set channel where notifications of new levels will be sent.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Please select a channel",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true,
                },
            ],
        },
        {
            name: "check",
            description: "Chceck the status leveling system.",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    async execute(interaction, client) {
        //
        const sub = interaction.options.getSubcommand();

        let response;
        if (sub === "setup") {
            response = await setToogle(interaction, interaction.options.getBoolean("enabled"));
        }

        if (sub === "channel") {
            response = await setChannel(interaction, interaction.options.getChannel("channel"));
        }

        if (sub === "check") {
            response = await displayStatus(interaction, client);
        }
        //
        async function setToogle(interaction, Toogle) {
            //
            const guildSettings = client.configs.get(interaction.guild.id);
            //
            guildSettings.levelToogle = Toogle;
            //
            client.configs.set(interaction.guild.id, guildSettings);
            //
            await guildConfigDB.findOneAndUpdate({ guildID: interaction.guild.id }, guildSettings);
            //
            let abc;

            if (Toogle === true) {
                abc = '``Enabled``';
            }
            else {
                abc = '``Disabled``';
            }
            //
            const toogleEmbed = new EmbedBuilder()
                .setTitle("🔐 | Configuration correctly amended!")
                .setColor(ec.success)
                .setDescription(`The service has been: ${abc}`)
                .setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [toogleEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
        //
        async function setChannel(interaction, channel) {
            //
            const guildSettings = client.configs.get(interaction.guild.id);
            //
            guildSettings.levelChannel = channel.id;
            //
            client.configs.set(interaction.guild.id, guildSettings);
            //
            await guildConfigDB.findOneAndUpdate({ guildID: interaction.guild.id }, guildSettings);
            //
            const channelEmbed = new EmbedBuilder()
                .setTitle("🔐 | Configuration correctly amended!")
                .setColor(ec.success)
                .setDescription(`A ${channel} channel has been set up for new level notifications`)
                .setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [channelEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
        //
        async function displayStatus(interaction, client) {
            const { levelToogle, levelChannel } = client.configs.get(interaction.guild.id);
            //
            const checkEmbed = new EmbedBuilder()
            //
            if (levelToogle === 'true' || levelToogle === 'True') {
                checkEmbed.setColor(ec.green)
            }
            else {
                checkEmbed.setColor(ec.wrong)
            }

            checkEmbed.setTitle("🔐 | Leveling settings");
            checkEmbed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            checkEmbed.addFields(
                {
                    name: "Enabled:",
                    value: `${levelToogle}`,
                    inline: true
                },
                {
                    name: "Message channel:",
                    value: `${levelChannel}`,
                    inline: true
                },
            )
            checkEmbed.setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
            checkEmbed.setTimestamp();
            return interaction.reply({ embeds: [checkEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
    }
}