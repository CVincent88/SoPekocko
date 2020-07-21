const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const bouncer = require('../middleware/expressBouncer-config');

// Route pour l'inscription au site
router.post('/signup', userCtrl.signup);

// Route pour la connexion au site
router.post('/login', bouncer.block, userCtrl.login);



module.exports = router;