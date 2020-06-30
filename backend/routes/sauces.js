const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');


// Middleware pour l'ajout de sauce
router.post('/', sauceCtrl.createSauce);

// Middleware pour la modification d'une sauce
router.put('/:id', sauceCtrl.modifySauce);

// Middleware pour la suppression d'une sauce
router.delete('/:id', sauceCtrl.deleteSauce);

// Middleware de récupération d'une sauce en particulier
router.get(':id', sauceCtrl.getOneSauce);

// Middleware de récupération de toutes les sauces
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;