const jwt = require('jsonwebtoken');
const datas = require('../datas/datas.json')

exports.getProfile = (req, reply, done) => {

  /**
   * Requete pour avoir infos user + actions achetés
   */
  let user;

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
    reply.code(500).send('erreur dans le controlleur pas de infoUser')
  }
  
}