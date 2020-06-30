const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Sauce = require('./models/Sauce');

mongoose.connect('mongodb+srv://SoPekocko_username:SoPekocko_password@sopekocko.wyaor.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware permettant l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.post('/api/sauces', (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({error}));
});

// Middleware test
app.get('/api/sauces', (req, res, next) => {
    const sauces = [
        {
            id: 'odifsfds',
            userId: 'Ksdfosnvsfbwi',
            name: 'Chipotle',
            manufacturer: 'Heinz',
            description: 'Une magnifique sauce au Chipotle',
            mainPepper: 'Chipotle',
            imageUrl: 'À venir',
            heat: 4,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        }
    ]
    res.status(200).json(sauces);
});

module.exports = app;