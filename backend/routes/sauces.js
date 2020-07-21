const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Route pour l'ajout de sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

// Route de like ou dislike de la sauce
router.post('/:id/like', auth, sauceCtrl.opinionOnSauce);

// Route pour la modification d'une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

// Route pour la suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Route de récupération d'une sauce en particulier
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Route de récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;