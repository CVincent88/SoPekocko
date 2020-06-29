const express = require('express');

const app = express();

// Middleware permettant l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

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