const axios = require('axios');

exports.Axios = axios.create({
    baseURL:'https://www.alphavantage.co/',
    headers : {
        'Content-Type': 'application/json',
    }
})

exports.Token = '0IVKXSY1154XQTGW'