import axios from 'axios';

export const API_BASE_URL = 'https://api.github.com/repos/';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});







