import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  timeout: 30 * 1000,
});

export default instance;
