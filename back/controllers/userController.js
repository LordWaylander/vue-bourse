const {User, userObjectId} = require('../models/userModel');
const {Achat} = require('../models/achatModel');

exports.getProfile = function(req, reply) {

  const opts = 'nom prenom favoris'

  User.findOne({_id: req.data.decodedToken.userId}, opts)
  .then(userProfile => {
    if(!!userProfile) {
      reply.code(200).send({user: userProfile})
    }
  })
  .catch(err => {
    console.log(err);
    reply.code(500).send({message: 'erreur dans le controlleur pas de user', err: err})
  })
}

exports.isFavList = function(req, reply) {
  let isFavList = false;

  User.findOne({_id: req.data.decodedToken.userId, favoris: req.params.query})
  .then((res) =>{
    if(!!res){
      isFavList = true
    }
    reply.send(isFavList)
  })
  .catch(err => {
    console.log(err);
    reply.send({err: err})
  })
}

exports.deleteFavoris = function(req, reply) {
  User.updateOne( {_id: req.data.decodedToken.userId}, { $pull: { 'favoris': req.params.indice }} )
  .then((res) => {
    if(!!res) {
      reply.send({delete: true})
    }
  })
  .catch(err => {
    console.log(err);
    reply.code(500).send({err: err})
  })
}

exports.addFavoris = function(req, reply) {
  User.updateOne( {_id: req.data.decodedToken.userId}, { $push: { 'favoris': req.body.indice }} )
  .then((res) => {
    if(!!res) {
      reply.send({add: true})
    }
  })
  .catch(err => {
    console.log(err);
    reply.code(500).send({err: err})
  })
}

exports.tableur = function(req, reply) {
  User.aggregate([
    {
      $lookup: {
        from: "achats",
        localField: "_id",
        foreignField: "userId",
        as: "achat",
        pipeline: [
          { 
            $match: {
              name: req.params.symbol
            }
          }
        ]
      }
    },
    { 
      $match: {
        _id: userObjectId(req.data.decodedToken.userId)
      }
    },
    { 
      $project: {
        prenom: 1,
        nom: 1,
        achat: 1
      }
    }
  ])
  .then(res => {
    if (!!res[0]) {
      reply.send(res[0])
    }
    reply.send({noActions: 'Vous n\'avez pas encore acheté d\'action'})
  })
  .catch(err => {
    console.log(err);
    reply.code(500).send({err: err})
  })
}

exports.userTableur = function(req, reply) {
  Achat.updateOne(
    { userId: req.data.decodedToken.userId, name: req.body.nameIndice }, 
    { $set: {
      listeAchat: req.body.listeAchat, 
      name: req.body.nameIndice, 
      devise: req.body.devise
      }
    }, 
    { upsert: true, setDefaultsOnInsert: true })
  .then((res)=> {
    reply.code(200).send({update: true});
  })
  .catch((err) => {
    console.log(err);
    reply.code(500).send(err);
  })
}