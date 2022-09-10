const authController = require('../controllers/authController');

module.exports = function (fastify, opt, done) {
    fastify.post('/login', {
        handler: authController.login,
    });
    fastify.post('/logout', {
        handler: authController.logout
    });
    fastify.post('/inscription', {
        handler: authController.createAccount
    });
    fastify.post('/verifToken', {
        handler: authController.verifToken
    });
    done();
}