const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

module.exports = function (fastify, opts, done) {
    fastify.post('/user/getProfile', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.getProfile,
    });
    fastify.get('/user/isFavList/:query', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.isFavList,
    });
    done();
}