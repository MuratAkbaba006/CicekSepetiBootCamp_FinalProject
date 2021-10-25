import axios from 'axios';
import Cookies from 'js-cookie';

export const AxiosAuth = axios.create({
  baseURL: 'https://bootcampapi.techcs.io/api/fe/v1/authorization',
});

export const AxiosPublic = axios.create({
  baseURL: 'https://bootcampapi.techcs.io/api/fe/v1',
});

export const AxiosPrivate = axios.create({
  baseURL: 'https://bootcampapi.techcs.io/api/fe/v1',
});

AxiosPrivate.interceptors.request.use((config) => {
  const { auth_token } = Cookies.get();
  config.headers.Authorization = `Bearer ${auth_token}`;
  return config;
});
