const indexController = require('../controllers/indexController.js');

module.exports = function (fastify, opt, done) {
    fastify.get('/', {
        handler: indexController.index
    });
    done();
}
