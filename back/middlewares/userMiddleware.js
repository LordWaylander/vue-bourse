const {config} = require('../_services/Env');
const jwt = require('jsonwebtoken');

exports.verifyTokenUser = (req, reply, done) => {
  let token = req.cookies.token

  try {
    let decodedToken = jwt.verify(token, config.JWT_SECRET);
    req.data = {decodedToken: decodedToken}
    done();
  } catch (err) {
    reply.code(500).send(err);
  }

}
