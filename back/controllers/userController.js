const jwt = require('jsonwebtoken');

exports.getProfile = (req, reply) => {

  /**
   * obtenir idUser via req.params.iduser
   * Vérifier si ID correct
   * Requete pour avoir infos user + actions achetés
   * vérifier le token ou non -> Middleware ?
   */
  const tokenDecoded = jwt.decode(req.body.token)
  if(!!tokenDecoded.userId) {
    reply.send('voici profil user')
  }else{
    reply.code(500).send('idUser à false')
  }
  
}