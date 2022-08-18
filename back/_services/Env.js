const schema = {
    type: 'object',
    required: [ 
        'SERVER_PORT',
        'API_KEY',
        'JWT_SECRET',
        'COOKIE_SECRET'
    ],
    properties: {
        SERVER_PORT: {
            type: 'number',
        },
        API_KEY: {
            type: 'string'
        },
        JWT_SECRET: {
            type: 'string'
        }
    }
}

const envSchema = require('env-schema');
exports.config = envSchema({
    schema: schema,
    dotenv: true 
})