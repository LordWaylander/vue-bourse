const {config} = require('./Env');
const axios = require('axios');

exports.axios = axios.create({
    baseURL:'https://www.alphavantage.co/',
    headers : {
        'Content-Type': 'application/json',
    }
})

exports.apiKey = config.API_KEY