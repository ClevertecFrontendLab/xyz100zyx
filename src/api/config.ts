import axios from 'axios';
import { HOST } from '../utils/constants';

export const api = axios.create({
  baseURL: HOST,
});

/* eslint-disable */

api.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    const accessToken = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
