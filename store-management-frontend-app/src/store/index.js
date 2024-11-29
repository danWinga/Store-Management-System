import { createStore } from 'vuex';
import { login, register, logout } from '../api/auth';

// Create the store instance
const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await login(credentials);
      commit('setToken', response.data.token);
      commit('setUser', response.data.user);
    },
    async register({ commit }, credentials) {
      const response = await register(credentials);
      commit('setToken', response.data.token);
      commit('setUser', response.data.user);
    },
    async logout({ commit }) {
      await logout();
      commit('clearAuth');
    }
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    }
  }
});

// Named export for useAuthStore
export const useAuthStore = () => store;

// Default export of the store instance
export default store;
