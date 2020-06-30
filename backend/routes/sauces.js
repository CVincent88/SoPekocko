const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');

// Middleware pour l'ajout de sauce
router.post('/', auth, sauceCtrl.createSauce);

// Middleware pour la modification d'une sauce
router.put('/:id', auth,  sauceCtrl.modifySauce);

// Middleware pour la suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Middleware de récupération d'une sauce en particulier
router.get(':id', auth, sauceCtrl.getOneSauce);

// Middleware de récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;