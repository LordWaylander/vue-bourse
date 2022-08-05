const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

module.exports = function (fastify, opts, done) {
    /**
     * MiddleWare pour vérifier token ?
     * CF : userController
     */
    fastify.post('/user/getProfile', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.getProfile,
    });
    done();
}