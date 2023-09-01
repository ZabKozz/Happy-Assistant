const { EmbedBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js');
const guildConfigDB = require('@models/guild-configuration');
const ec = require('@config/embed');

module.exports = {
    name: 'anti-link',
    description: '🔐 | Anti-link system',
    botPermissions: [""],
    userPermissions: ["ManageGuild"],
    version: '1.0.1',
    options: [
        {
            name: "setup",
            description: "Setting of the anti-link system.",
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
            name: "permission",
            description: "Setting of the anti-link system.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "permission",
                    description: "Setting the permission which can send links.",
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: 'Manage Channels', value: 'ManageChannels' },
                        { name: 'Manage Server', value: 'ManageServer' },
                        { name: 'Embed Links', value: 'EmbedLinks' },
                        { name: 'Attach Files', value: 'AttachFiles' },
                        { name: 'Manage Message', value: 'ManageMessage' },
                        { name: 'Administrator', value: 'Administrator' },
                    ],
                    required: true,
                },
            ],
        },
        {
            name: "message",
            description: "Setting of the anti-link system.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'message',
                    description: 'Message to be displayed when the link is sent.',
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ],
            required: false
        },
        {
            name: "check",
            description: "Chceck the status anti-link system.",
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

        if (sub === "permission") {
            response = await setPermission(interaction, interaction.options.getString("permission"));
        }

        if (sub === "message") {
            response = await setMessage(interaction, interaction.options.getString("message"));
        }
        //

        if (sub === "check") {
            response = await displayStatus(interaction, client);
        }
        //
        async function setToogle(interaction, Toogle) {
            //
            const guildSettings = client.configs.get(interaction.guild.id);
            //
            guildSettings.anti_linkToogle = Toogle;
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
        async function setPermission(interaction, perm) {
            //
            const guildSettings = client.configs.get(interaction.guild.id);
            //
            guildSettings.anti_linkPermission = perm;
            //
            client.configs.set(interaction.guild.id, guildSettings);
            //
            await guildConfigDB.findOneAndUpdate({ guildID: interaction.guild.id }, guildSettings);
            //
            const permissionEmbed = new EmbedBuilder()
                .setTitle("🔐 | Configuration correctly amended!")
                .setColor(ec.success)
                .setDescription(`A ${perm} channel has been set up for new anti-link notifications`)
                .setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [permissionEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
        //
        async function setMessage(interaction, msg) {
            //
            const guildSettings = client.configs.get(interaction.guild.id);
            //
            guildSettings.anti_linkMessage = msg;
            //
            client.configs.set(interaction.guild.id, guildSettings);
            //
            await guildConfigDB.findOneAndUpdate({ guildID: interaction.guild.id }, guildSettings);
            //
            const permissionEmbed = new EmbedBuilder()
                .setTitle("🔐 | Configuration correctly amended!")
                .setColor(ec.success)
                .setDescription(`A ${msg} channel has been set up for new anti-link notifications`)
                .setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            return interaction.reply({ embeds: [permissionEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
        //
        async function displayStatus(interaction, client) {
            const { anti_linkToogle, anti_linkPermission, anti_linkMessage } = client.configs.get(interaction.guild.id);
            //
            const checkEmbed = new EmbedBuilder()
            //
            if (anti_linkToogle === 'true' || anti_linkToogle === 'True') {
                checkEmbed.setColor(ec.green)
            }
            else {
                checkEmbed.setColor(ec.wrong)
            }

            checkEmbed.setTitle("🔐 | Anti-link settings");
            checkEmbed.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            checkEmbed.addFields(
                {
                    name: "Enabled:",
                    value: `${anti_linkToogle}`,
                    inline: true
                },
                {
                    name: "NeedPremission:",
                    value: `${anti_linkPermission}`,
                    inline: true
                },
                {
                    name: "Message:",
                    value: `${anti_linkMessage}`, inline: true
                }
            )
            checkEmbed.setFooter({ text: ` • Requested by ${interaction.user.globalName}`, iconURL: client.user.displayAvatarURL() })
            checkEmbed.setTimestamp();
            return interaction.reply({ embeds: [checkEmbed], allowedMentions: { repliedUser: false, ephemeral: true } })
        }
    }
}