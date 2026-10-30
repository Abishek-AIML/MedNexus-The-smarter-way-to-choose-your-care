import axios from 'axios';

// 1. Detect environment automatically
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const LIVE_BACKEND_URL = 'https://mednexus-hospital-management.onrender.com'; 

const configuredApiUrl = import.meta.env.VITE_API_URL;
const API_URL = (configuredApiUrl || (isLocalhost ? '' : LIVE_BACKEND_URL))
  .replace(/\/+$/, '');

export const API_BASE_URL = `${API_URL}/api`;

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const LEGACY_LOCAL_API_URL = 'http://localhost:3000';

axios.interceptors.request.use((config) => {
  if (config.url?.startsWith(LEGACY_LOCAL_API_URL)) {
    config.url = `${API_URL}${config.url.slice(LEGACY_LOCAL_API_URL.length)}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API_URL;