const {config} = require('./Env');
const axios = require('axios');

exports.axios = axios.create({
    baseURL:'https://www.alphavantage.co/',
    headers : {
        'Content-Type': 'application/json',
    },
    /*proxy: {
        host: config.HTTP_PROXY_ADDRESS,
        protocol: 'https',
        auth: {
            username: config.HTTP_PROXY_USER, 
            password: config.HTTP_PROXY_MDP
        }
    }*/
})

exports.apiKey = config.API_KEY