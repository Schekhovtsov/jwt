import axios, { Axios, AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:5000/api';

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
