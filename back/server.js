const fastify = require('fastify')({logger: true});
const autoload = require('@fastify/autoload');
const path = require('path');

fastify.register(require('@fastify/cors'));

/**
 * utile uniquement pour postman a 1ere vue
 */
fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/multipart'));

//env-schema -> CF : configEnv.js

const configEnv = require('./config/Env.js');
fastify.listen(configEnv.config.SERVER_PORT)
.then((address) => {
    fastify.log.info('ADDR Serveur '+address)
})
.catch((err)=> {
    fastify.log.error(err), process.exit(1)
})


//visions des routes ouvertes à definir AVANT l'initialisation des routes
fastify.addHook('onRoute', (routeOptions) => {
    console.log(`Registered route: ${routeOptions.url}`)
})

// définition des routes
//fastify.register(require('./routes/indexRoute'));
fastify.register(autoload, {
    dir: path.join(__dirname, 'routes')
})