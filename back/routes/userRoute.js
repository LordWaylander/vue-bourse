const userController = require('../controllers/userController');
const {verifyTokenUser} = require('../middlewares/userMiddleware');

module.exports = function (fastify, opts, done) {
    fastify.post('/user/getProfile', {
        preHandler: verifyTokenUser,
        handler: userController.getProfile,
    });
    fastify.get('/user/isFavList/:query', {
        preHandler: verifyTokenUser,
        handler: userController.isFavList,
    });
    fastify.patch('/user/addFavoris', {
        preHandler: verifyTokenUser,
        handler: userController.addFavoris,
    });
    fastify.delete('/user/deleteFavoris/:indice', {
        preHandler: verifyTokenUser,
        handler: userController.deleteFavoris,
    });
    fastify.get('/tableur/:symbol', {
        preHandler: verifyTokenUser,
        handler: userController.tableur,
    });
    fastify.post('/user/tableur', {
        preHandler: verifyTokenUser,
        handler: userController.userTableur,
    });
    done();
}