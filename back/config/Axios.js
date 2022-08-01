const configEnv = require('../config/Env');
const axios = require('axios');

exports.axios = axios.create({
    baseURL:'https://www.alphavantage.co/',
    headers : {
        'Content-Type': 'application/json',
    },
    /*proxy: {
        host: configEnv.config.HTTP_PROXY_ADDRESS,
        protocol: 'https',
        auth: {
            username: configEnv.config.HTTP_PROXY_USER, 
            password: configEnv.config.HTTP_PROXY_MDP
        }
    }*/
})

exports.token = configEnv.config.API_KEY