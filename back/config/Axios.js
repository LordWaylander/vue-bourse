const axios = require('axios');

exports.axios = axios.create({
    baseURL:'https://www.alphavantage.co/',
    headers : {
        'Content-Type': 'application/json',
    }
})

exports.token = '0IVKXSY1154XQTGW'a