<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Store Manager</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
        </ul>
        <div>
          <button class="btn btn-outline-light" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'; // Import the router
import { useAuthStore } from '@/store/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); // Initialize the router instance

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return { logout };
  }
};
</script>
