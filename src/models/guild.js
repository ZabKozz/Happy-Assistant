const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('../config/config');

const guildSchema = mongoose.Schema({
    guildID: {
        type: String,
        require: true,
        unique: true,
    },
    ownerID: String,
    prefix: {
        type: String,
        require: true,
        default: defaults.prefix,
    },
    welcomeChannel: {
        type: String,
        default: defaults.welcomeChannel,
    },
    welcomeMsg: {
        type: String,
        default: defaults.welcomeMsg,
    },
});

module.exports = mongoose.model('Guild', guildSchema);