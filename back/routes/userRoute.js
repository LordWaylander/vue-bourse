const userController = require('../controllers/userController');

module.exports = function (fastify, opts, done) {
    /**
     * MiddleWare pour vérifier token ?
     * CF : userController
     */
    fastify.get('/user/getProfile/:idUser', {
        handler: userController.getProfile,
    });
    done();
}