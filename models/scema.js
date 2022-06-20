const mongoose = require('mongoose');

const msgSchama = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Chat', msgSchama);