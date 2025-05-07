import axios from 'axios';

const api = axios.create({
  baseURL: 'https://payswift-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add any request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 