<template>
  <div class="login-container">
    <div class="form-container">
      <h2>{{ isLoginMode ? 'Login' : 'Register' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn-submit">
          {{ isLoginMode ? 'Login' : 'Register' }}
        </button>
        <p @click="toggleMode" class="toggle-mode">
          {{ isLoginMode ? 'Don\'t have an account? Register' : 'Already have an account? Login' }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import the router
import { useAuthStore } from '@/store/auth'; // Adjust the path to your auth store

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Initialize the router instance
    const isLoginMode = ref(true);
    const username = ref('');
    const password = ref('');

    const toggleMode = () => {
      isLoginMode.value = !isLoginMode.value;
    };

    const handleSubmit = async () => {
      try {
        if (isLoginMode.value) {
          // Login action
          await authStore.login({ username: username.value, password: password.value });
          alert('Login successful!');
          router.push('/dashboard'); // Redirect to dashboard
        } else {
          // Register action
          await authStore.register({ username: username.value, password: password.value });
          alert('Registration successful!');
          isLoginMode.value = true; // Switch to login mode after registration
        }
      } catch (error) {
        alert(error.message || 'An error occurred. Please try again.');
      }
    };

    return {
      isLoginMode,
      username,
      password,
      toggleMode,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.form-container {
  width: 25%;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.toggle-mode {
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  cursor: pointer;
}

.toggle-mode:hover {
  text-decoration: underline;
}
</style>
