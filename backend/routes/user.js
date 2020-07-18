const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const bouncer = require('../middleware/expressBouncer-config');

router.post('/signup', userCtrl.signup);

router.post('/login', bouncer.block, userCtrl.login);



module.exports = router;