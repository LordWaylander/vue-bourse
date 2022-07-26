const fastify = require('fastify')({logger: true});
const path = require('path');

/*
    //Moteur template EJS

fastify.register(require("point-of-view"), {
    engine: {
      ejs: require("ejs"),
    },
    root: path.join(__dirname, './views')
});
*/
    //env-schema -> CF : configEnv.js

const configEnv = require('./config/configEnv.js')

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
fastify.register(require('./routes/indexRoute'));
