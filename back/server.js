const fastify = require('fastify')({logger: true});
const autoload = require('@fastify/autoload');
const path = require('path');
const {config} = require('./_services/Env.js');

// connection à MongoDB
fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: 'mongodb://localhost:27017/'
})

fastify.listen(config.SERVER_PORT)
.then((address) => {
    fastify.log.info('ADDR Serveur '+address);
})
.catch((err)=> {
    fastify.log.error(err), process.exit(1)
})

fastify.register(require('@fastify/cors'), {
  // ces deux opts a true avec axios et les credentials à true
  origin: true,
  credentials: true,
});
fastify.register(require('@fastify/cookie'), {
    secret: config.COOKIE_SECRET,
    parseOptions: {}
})

/**
 * utile uniquement pour postman a 1ere vue
 */
fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/multipart'));

//visions des routes ouvertes à definir AVANT l'initialisation des routes
fastify.addHook('onRoute', (routeOptions) => {
    console.log(`Registered route: ${routeOptions.url}`)
})

// définition des routes
fastify.register(autoload, {
    dir: path.join(__dirname, 'routes')
})