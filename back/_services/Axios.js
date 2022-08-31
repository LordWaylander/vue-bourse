const {config} = require('./Env');
const axios = require('axios');

exports.axios = axios.create({
    baseURL: config.API_URL,
    headers : {
        'Content-Type': 'application/json',
    }
})

exports.apiKey = config.API_KEY