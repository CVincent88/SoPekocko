const mongoose = require('mongoose');
const sauceValidator = require('../middleware/sauceValidator');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, validate: sauceValidator.nameValidator},
    manufacturer: {type: String, required: true, validate: sauceValidator.manufacturerValidator},
    description: {type: String, required: true, validate: sauceValidator.descriptionValidator},
    mainPepper: {type: String, required: true, validate: sauceValidator.descriptionValidator},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    usersLiked: [{ type: String, required: false, default : [] }],
    usersDisliked: [{ type: String, required: false, default : [] }],
});

module.exports = mongoose.model('Sauce', sauceSchema);