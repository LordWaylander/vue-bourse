const indexController = require('../controllers/indexController.js');
const MiddlewareExemple = require('../middlewares/pageMiddleware.js')
const axios = require('../config/Axios.js');

module.exports = function (fastify, opt, done) {
    fastify.get('/:id', {
        handler: indexController.index,
        preHandler: MiddlewareExemple.test,
    })
    fastify.get('/accueil', {
        handler: indexController.index
    });
    done();
}
