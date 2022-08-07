const {config} = require('../_services/Env');
const jwt = require('jsonwebtoken');

exports.verifyTokenUser = (req, reply, done) => {
  let token = req.cookies.token

  try {
    let decodedToken = jwt.verify(token, config.JWT_SECRET);
    /**
     * Une fois vérifier, pourquoi ne pas le comparer a la date actuelle et si expiration <= 5 min
     * renvoyer une "erreur" en disant qu'il va falloir se reconnecter sauf si clic sur button 
     * si clic button, génération nouveau token
     */
    req.data = {decodedToken: decodedToken}
    done();
  } catch (err) {
    reply.code(500).send(err);
  }

}
