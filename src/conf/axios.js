import axios from 'axios';
import env from '@ludovicm67/react-dotenv';

const instance = axios.create({
  baseURL: 'https://api.kinopoisk.dev/v1.4',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  config.headers['X-API-KEY'] = env.TOKEN;

  return config;
});

export default instance;
