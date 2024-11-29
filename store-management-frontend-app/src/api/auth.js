import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://127.0.0.1:5000',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add this line to export apiClient
export default apiClient;

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);
    return response.data; // Ensure this returns { user, token }
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

export const register = async (credentials) => {
  try {
    const response = await apiClient.post('/register', credentials);
    return response.data; // Ensure this returns { user, token }
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};
