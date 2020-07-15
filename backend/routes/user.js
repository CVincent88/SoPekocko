const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const bouncer = require ("express-bouncer")(600, 20000, 2); // Protection against bruteforce attacks


router.post('/signup', userCtrl.signup);

router.post('/login', bouncer.block, userCtrl.login);



module.exports = router;