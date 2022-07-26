import axios from 'axios';

const Axios = axios.create({
  baseURL:'https://www.alphavantage.co/',
  headers : {
    'Content-Type': 'application/json',
  }
})

const Token = 'API_KEY';

export default {Axios, Token}