const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('@config/config.js');

const guildSchema = mongoose.Schema({
    guildID: {
        type: String,
        require: true,
        unique: true,
    },
    guildInformation: {
        name: String,
        region: String,
        owner: { type: String, ref: "users" },
        joinedAt: Date,
        leftAt: Date,
    },
    leveling: {
        enabled: {
            type: Boolean,
            default: false
        },
        channel: {
            type: String,
            default: defaults.leveling.levelChannel,
        }
    },
    autoMod: {
        anti_links: {
            type: Boolean,
            default: false
        },
        anti_links_Premissions: {
            type: String,
            default: defaults.autoMod.anti_linksPermission,
        },
        anti_links_Message: {
            type: String,
            default: defaults.autoMod.anti_linksMessage,
        }
    },
});

module.exports = mongoose.model('Guild', guildSchema);