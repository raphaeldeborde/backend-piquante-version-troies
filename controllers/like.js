const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {  
  
  const sauceLikeObject = req.body;
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {      

      if((!sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 1) ) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : 1}, $push: { usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce +1 like" }))
        .catch((error) => {res.status(400).json({ error })});
      };      

      if((sauce.usersLiked.includes(req.body.userId)) && (req.body.like == 0) ) {
        console.log("ok like = 0");
        Sauce.updateOne({_id: req.params.id}, { $inc: {likes: -1}, $pull: {usersLiked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }

     if((!sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == -1) ) {
      console.log("ok dislike +1");
      Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : 1}, $push: { usersDisliked : req.body.userId}, _id: req.params.id})
      .then(() => res.status(201).json({ message: "sauce +1 dislike" }))
      .catch((error) => {res.status(400).json({ error })});
      };  

      if((sauce.usersDisliked.includes(req.body.userId)) && (req.body.like == 0) ) {
        Sauce.updateOne({_id: req.params.id}, { $inc: {dislikes: -1}, $pull: {usersDisliked : req.body.userId}, _id: req.params.id})
        .then(() => res.status(201).json({ message: "sauce 0 like" }))
        .catch((error) => {res.status(400).json({ error })});
      }   
  })  
  .catch((error) => res.status(404).json({error}));
};