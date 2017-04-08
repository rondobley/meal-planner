var mongoose = require('mongoose');

var dishSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    reference: {
        type: String
    },
    tags: [{
        type: String,
        index: true
    }]
});

module.exports = mongoose.model('dish', dishSchema);