const schema = {
    type: 'object',
    required: [ 'SERVER_PORT'],
    properties: {
        SERVER_PORT: {
            type: 'number',
        }
    }
}

const envSchema = require('env-schema');
exports.config = envSchema({
    schema: schema,
    dotenv: true 
})