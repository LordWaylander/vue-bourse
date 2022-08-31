const fastify = require('fastify')({logger: true});
const autoload = require('@fastify/autoload');
const path = require('path');
const {config} = require('./_services/Env.js');
const mongoose = require('mongoose');

mongoose.connect(config.BDD_URL)
.then(() => {
    //require des models, pour pas les importer dans les models, ou il faut
    require('./models/userModel');
    require('./models/achatModel');
    fastify.listen({port: config.SERVER_PORT})
})
.catch(err => {
    console.error(err),
    process.exit(1)
})

/**
 * utile uniquement pour postman a 1ere vue
 */
fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/multipart'));

fastify.register(require('@fastify/cors'), {
  /**
   * ces deux opts a true avec axios et les credentials à true
   * Permet de set des cookies dans la requête
   */
  origin: true,
  credentials: true,
});

fastify.register(require('@fastify/cookie'), {
    //regarder les options dispo ! ...
    secret: config.COOKIE_SECRET,
    parseOptions: {}
})

//visions des routes ouvertes à definir AVANT l'initialisation des routes
fastify.addHook('onRoute', (routeOptions) => {
    console.log(`Registered route: ${routeOptions.url}`)
})

// définition des routes
fastify.register(autoload, {
    dir: path.join(__dirname, 'routes')
})