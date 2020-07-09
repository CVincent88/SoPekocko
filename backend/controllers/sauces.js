const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({error: error}));
};

exports.opinionOnSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => { 
      switch (req.body.like) {
          case 1 : // If the user likes the sauce
              if (!sauce.usersLiked.includes(req.body.userId)) {  // And that he hasn't liked the sauce yet
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Vous aimez cette sauce !' }))
                .catch((error) => {res.status(400).json({error: error});});
              } // Add a like to the sauce and push his userId into the usersLiked array
            break;
    
          case -1 :  // If the user Dislikes the sauce
              if (!sauce.usersDisliked.includes(req.body.userId)) {  // And that he hasn't disliked the sauce yet
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
            .then(() => res.status(201).json({ message: 'Vous n\'aimez pas cette sauce !' }))
            .catch(error => res.status(400).json({ error }));
              }  // Adds a dislike to the sauce and push his userId into the usersDisliked array
            break;
    
          case 0: // Two different options here, either removes a like or removes a dislike
              if (sauce.usersLiked.includes(req.body.userId)) { // If the users' Id is already present in usersLiked
                Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus cette sauce !' })) // Upon clicking like, remove a like from the sauce and remove his userId from the array
                .catch(error => res.status(400).json({ error }));
              } else if (sauce.usersDisliked.includes(req.body.userId)) { // If the users' ID is already present in usersDisliked
                Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
                .then(() => res.status(201).json({ message: 'Vous ne détestez plus cette sauce !' })) // Do the opposite
                .catch(error => res.status(400).json({ error })); 
              }   
            break;
          
          default: // If none of the previous 4 options are true, this error message will appear
            throw { error: "Impossible de modifier vos likes, merci de bien vouloir réessayer ultérieurement" };
      }
    })
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json('Sauce modifiée !'))
        .catch(error => res.status(400).json({error: error}));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json('Sauce supprimée'))
        .catch(error => res.status(400).json({error: error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error: error}));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error: error}));
};

