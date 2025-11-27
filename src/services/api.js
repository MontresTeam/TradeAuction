import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  registerVendor: async (vendorData) => {
    const response = await api.post('/auth/register/vendor', vendorData);
    return response.data;
  },

  verifyOTP: async (otpData) => {
    const response = await api.post('/auth/verify-otp/vendor', otpData);
    return response.data;
  },

  resendOTP: async () => {
    const response = await api.post('/auth/resend-otp/vendor');
    return response.data;
  }
};

export default api;