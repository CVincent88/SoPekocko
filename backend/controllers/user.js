const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const bouncer = require('../middleware/expressBouncer-config');

// Regex référence pour validation des adresses email
const emailRegex = /^[a-zA-Z0-9.\-]{2,20}@([a-zA-Z0-9]{2,15})+(\.[a-zA-Z]{2,3})+((\.[a-zA-Z]{2,3})?)+$/

// Fonction de comparation de l'adresse email à la regex - Renvoie true si l'email matche la regex
function isValid(regex, emailToTest) {
  return regex.test(emailToTest);
}

const schemaPassword = new passwordValidator();

schemaPassword // Password validation rules
.is().min(8)
.is().max(20)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces();



exports.signup = (req, res, next) => {
  if(isValid(emailRegex, req.body.email) && schemaPassword.validate(req.body.password)){ // Protections against SQL injection: Signup will occur only if email respect regex and password respect schema.
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({message: 'Impossible d\'enregistrer le nouvel utilisateur'}));
  }else
     throw {error: "L\'adresse email our le mot de passe est incorrect"};

};

exports.login = (req, res, next) => {
  if(isValid(emailRegex, req.body.email) && schemaPassword.validate(req.body.password)){ // protection against SQL injection (same as in signup middleware)
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }else{
              bouncer.reset(req); // Resetting Express-bouncer if password is valid
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  '936A8467672E5466CF266A93651CC',
                  { expiresIn: '1800s' }
                )
              });
            }
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }else{
    throw console.log('L\'adresse email ou le mot de passe de respecte pas la politique de sécurité.');
  }
};