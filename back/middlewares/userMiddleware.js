const {config} = require('../_services/Env');
const jwt = require('jsonwebtoken');

exports.verifyTokenUser = (req, reply, done) => {
  let token = req.cookies.token

  /**
   * Comprends pas pourquoi ça marchais avec le localStorage et en cookie ça marche plus
   */
  /*try {
    jwt.verify(token, config.JWT_SECRET);
    done();
  } catch (err) {
    reply.code(500).send(err);
  }*/

  jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
    if(!!decoded){
      done
    }else{
      reply.code(500).send(err);
    }
  });

}
