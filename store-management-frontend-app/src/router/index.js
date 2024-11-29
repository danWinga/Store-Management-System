import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/components/UserLogin.vue';
import AppDashboard from '@/views/UserDashboard.vue';

const routes = [
  { path: '/', component: UserLogin },
  { path: '/dashboard', component: AppDashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to check if user is authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;
