const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('../config/config');

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
});

module.exports = mongoose.model('Guild', guildSchema);