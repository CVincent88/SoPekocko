const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

// Logique de connexion à MongoDB
mongoose.connect('mongodb+srv://SoPekocko_username:SoPekocko_password@sopekocko.wyaor.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(helmet());

// Middleware permettant l'accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parse incoming request body in a middleware
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;