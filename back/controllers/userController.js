exports.getProfile = (req, reply) => {

  /**
   * obtenir idUser via req.params.iduser
   * Vérifier si ID correct
   * Requete pour avoir infos user + actions achetés
   * vérifier le token ou non -> Middleware ?
   */

  if(!!req.params.idUser) {
    reply.send('voici profil user')
  }else{
    reply.code(500).send('idUser à false')
  }
  
}