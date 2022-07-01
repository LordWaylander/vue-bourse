import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://api.tiingo.com/'
})

export default Axios