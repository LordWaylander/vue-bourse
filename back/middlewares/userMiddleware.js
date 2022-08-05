const {config} = require('../_services/Env');
const jwt = require('jsonwebtoken');

exports.verifyTokenUser = (req, reply, done) => {

  try {
    jwt.verify(req.body.token, config.JWT_SECRET);
    done();
  } catch (err) {
    reply.code(500).send(err);
  }
}
