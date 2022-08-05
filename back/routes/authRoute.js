const authController = require('../controllers/authController');

module.exports = function (fastify, opt, done) {
    fastify.post('/login', {
        handler: authController.login,
    });
    fastify.get('/logout', {
        handler: authController.logout
    });
    fastify.get('/createAccount', {
        handler: authController.createAccount
    });
    fastify.post('/verifToken', {
        handler: authController.verifToken
    });
    done();
}