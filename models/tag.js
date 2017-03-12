var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        unique: true,
        index: true
    }
});

module.exports = mongoose.model('tag', tagSchema);