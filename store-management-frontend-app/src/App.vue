<template>
  <div id="app">
    <!-- Header -->
    <header>
      <div v-if="isAuthenticated">
        <h1>Welcome, {{ user?.username || 'User' }}!</h1>
        <button @click="handleLogout" class="btn btn-secondary">Logout</button>
      </div>
      <div v-else>
        <h1>STORE MANAGEMENT SYSTEM</h1>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer>
      <p>&copy; 2024 Store Management System</p>
    </footer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'; // Import the router
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Initialize the router instance
    const isAuthenticated = computed(() => !!authStore.token);
    const user = computed(() => authStore.user);

    const handleLogout = async () => {
      try {
        authStore.logout();
        router.push('/');
      } catch (err) {
        alert('Logout failed. Please try again.');
      }
    };

    return { isAuthenticated, user, handleLogout };
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
}

header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
}

header h1 {
  margin: 0;
}

footer {
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px;
  margin-top: 20px;
}
</style>
