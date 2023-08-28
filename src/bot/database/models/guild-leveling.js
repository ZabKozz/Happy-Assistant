const mongoose = require('mongoose');
const { defaultleveling: defaults } = require('@config/config.js');

const guildLevelingSchema = mongoose.Schema({
    userID: {
        type: String,
        require: true,
    },
    guildID: {
        type: String,
        require: true,
    },
    xp: {
        type: Number,
        default: defaults.xp,
    },
    level: {
        type: Number,
        default: defaults.level,
    }
});

module.exports = mongoose.model('Guild-Leveling', guildLevelingSchema);