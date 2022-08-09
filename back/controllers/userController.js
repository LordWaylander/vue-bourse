const jwt = require('jsonwebtoken');
const datas = require('../datas/datas.json')

exports.getProfile = (req, reply, done) => {
  let user = null;

  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      user = {
        userName : element.nom,
        userFirstname: element.prenom,
        userMail: element.email
      }
    }
  });
  
  if(!!user) {
    reply.send({user: user})
  }else{
    reply.code(500).send('erreur dans le controlleur pas de user')
  }
}

exports.isFavList = (req, reply, done) => {
  console.log(req.params);
  let isFavList = false;

  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      element.favoris.forEach(favoriElement => {
        if (req.params.query == favoriElement) {
          return isFavList = true
        }
      })
    }
  });

  reply.send(isFavList)
}