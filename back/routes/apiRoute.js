const apiController = require('../controllers/apiController.js');

module.exports = function (fastify, opt, done) {
    fastify.get('/time_series_daily/:query', {
        handler: apiController.time_series_daily,
    });
    fastify.get('/global_quote/:query', {
        handler: apiController.global_quote
    });
    fastify.get('/symbol_search/:query', {
        handler: apiController.symbol_search
    });
    done();
}
