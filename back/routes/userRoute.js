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
    fastify.patch('/user/addFavoris', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.addFavoris,
    });
    fastify.delete('/user/deleteFavoris/:indice', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.deleteFavoris,
    });
    fastify.get('/tableur/:symbol', {
        preHandler: userMiddleware.verifyTokenUser,
        handler: userController.tableur,
    });
    done();
}