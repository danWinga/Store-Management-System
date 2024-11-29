import { defineStore } from 'pinia';
import { login as loginApi, register as registerApi } from '@/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await loginApi(credentials);
        this.user = response.user;
        this.token = response.token;
        localStorage.setItem('token', response.token);
      } catch (error) {
        throw new Error(error.message || 'Login failed.');
      }
    },
    async register(userDetails) {
      try {
        await registerApi(userDetails);
      } catch (error) {
        throw new Error(error.message || 'Registration failed.');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
