import axios from 'axios';

const Axios = axios.create({
  baseURL:'https://www.alphavantage.co/',
  headers : {
    'Content-Type': 'application/json',
  }
})

const Token = '0IVKXSY1154XQTGW';

export default {Axios, Token}