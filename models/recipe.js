var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        index: true
    },
    tags: {
        type: [{tag: String}],
        index: true
    }
});

module.exports = mongoose.model('recipe', recipeSchema);