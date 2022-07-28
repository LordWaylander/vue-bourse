const schema = {
    type: 'object',
    required: [ 
        'SERVER_PORT', 
    ],
    properties: {
        SERVER_PORT: {
            type: 'number',
        },
        HTTP_PROXY_ADDRESS: {
            type: 'string'
        },
        HTTP_PROXY_USER: {
            type: 'string'
        },
        HTTP_PROXY_MDP: {
            type: 'string'
        }
    }
}

const envSchema = require('env-schema');
exports.config = envSchema({
    schema: schema,
    dotenv: true 
})