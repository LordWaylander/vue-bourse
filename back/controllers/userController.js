const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const {mongodb} = require('../_services/Bdd');
//mongodb(this).findOne({id: req.data.decodedToken.userId})

exports.getProfile = function(req, reply) {
  const opts = {
    'nom': 1,
    'prenom': 1,
    'favoris': 1
  };

  mongodb(this).findOne({id: req.data.decodedToken.userId}, {projection: opts})
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

  mongodb(this).findOne({id: req.data.decodedToken.userId, favoris: req.params.query})
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
  mongodb(this).updateOne( {id: req.data.decodedToken.userId}, { $pull: { 'favoris': req.params.indice }} )
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
  mongodb(this).updateOne( {id: req.data.decodedToken.userId}, { $push: { 'favoris': req.body.indice }} )
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
  /**
   * Non je n'ai pas trouvé plus simple pour le moment,
   * Pour obtenir UNIQUEMENT la liste d'achat selon req.params.symbol
   */

  mongodb(this).aggregate([
    { $match: {id: req.data.decodedToken.userId}},
    {$project: {
      achat: {$filter: {
          input: '$achat',
          as: 'achat',
          cond: {$eq: ['$$achat.name', req.params.symbol]}
      }},
  }}
  ]).toArray()
  .then(res => {
    console.log(res[0].achat);
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
  console.log('*** userTableur ***');
  let listeAchat = req.body.listeAchat
  let nameIndice = req.body.nameIndice
  console.log(listeAchat);
  console.log(nameIndice);

  //mongodb(this).updateOne( {id: req.data.decodedToken.userId}, { $push / pull ?: { 'achat': req.body.listeAchat }} )

  /*console.log('*** datas ***');
  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      element.achat.forEach(el => {
        if(el.name === nameIndice) {
          console.log(el);
        }
      });
    }
  });
  console.log('******');
  
  listeAchat.forEach(element => {
    console.log('*** element ***');
    console.log(element);
    console.log('******');
  });*/

  reply.code(200).send('ok');
}