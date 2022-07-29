const apiController = require('../controllers/apiController.js');

module.exports = function (fastify, opt, done) {
    fastify.get('/api/time_series_daily/:query', {
        handler: apiController.time_series_daily,
    });
    fastify.get('/api/global_quote/:query', {
        handler: apiController.global_quote
    });
    fastify.get('/api/symbol_search/:query', {
        handler: apiController.symbol_search
    });
    done();
}
