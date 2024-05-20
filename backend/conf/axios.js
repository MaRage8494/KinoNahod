import axios from 'axios';
import 'dotenv/config.js';

const instance = axios.create({
  baseURL: 'https://api.kinopoisk.dev/v1.4',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  config.headers['X-API-KEY'] = process.env.TOKEN;

  return config;
});

export default instance;
