import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://case.nodelabs.dev/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  profile: () => api.get('/users/profile'),
};

export const financialAPI = {
  getSummary: () => api.get('/financial/summary'),
  getWorkingCapital: () => api.get('/financial/working-capital'),
  getWallet: () => api.get('/financial/wallet'),
  getRecentTransactions: () => api.get('/financial/transactions/recent'),
  getScheduledTransfers: () => api.get('/financial/transfers/scheduled'),
};

export default api;
