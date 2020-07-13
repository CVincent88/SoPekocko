const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '936A8467672E5466CF266A93651CC');
        const userId = decodedToken.userId;

        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable';
        }else{
            next();
        }
    } catch(error){
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};

// '936A8467672E5466CF266A93651CC'

// require('crypto').randomBytes(64).toString('hex')