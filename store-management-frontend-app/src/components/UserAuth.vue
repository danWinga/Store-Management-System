<template>
    <div class="auth-container">
      <h2 v-if="isLoginMode">Login</h2>
      <h2 v-else>Register</h2>
  
      <form @submit.prevent="isLoginMode ? loginUser() : registerUser()">
        <div class="mb-3">
          <label for="username" class="form-label">username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isLoginMode ? 'Login' : 'Register' }}
        </button>
      </form>
  
      <button class="btn btn-link mt-3" @click="toggleMode">
        {{ isLoginMode ? "Don't have an account? Register" : 'Already have an account? Login' }}
      </button>
  
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'; // Import the router
  import { login, register } from '@/api/auth';
  
  export default {
    const router = useRouter();
    data() {
      return {
        isLoginMode: true,
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        this.errorMessage = '';
      },
      async loginUser() {
        try {
          const response = await login({ username: this.username, password: this.password });
          alert('Login successful!');
          router.push('/dashboard'); // Redirect to dashboard
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      async registerUser() {
        try {
          const response = await register({ username: this.username, password: this.password });
          alert('Registration successful! Please log in.');
          this.toggleMode();
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    max-width: 400px;
    margin: 50px auto;
  }
  </style>
  