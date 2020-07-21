const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Vérification que l'adresse email entrée est unique

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);