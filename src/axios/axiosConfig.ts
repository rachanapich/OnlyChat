import axios from 'axios';
// const baseURL = 'http://localhost:8080/';
const baseURL = 'https://chatapp-backend-production-e913.up.railway.app/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
