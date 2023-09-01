const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('@config/config.js');

const guildSchema = mongoose.Schema({
    guildID: {
        type: String,
        require: true,
        unique: true,
    },
    ownerID: String,
    levelToogle: {
        type: String,
        default: defaults.levelToogle,
    },
    levelChannel: {
        type: String,
        default: defaults.levelChannel,
    },
    anti_linkToogle: {
        type: String,
        default: defaults.anti_linkToogle,
    },
    anti_linkPermission: {
        type: String,
        default: defaults.anti_linkPermission,
    },
    anti_linkMessage: {
        type: String,
        default: defaults.anti_linkMessage,
    },
});

module.exports = mongoose.model('Guild', guildSchema);