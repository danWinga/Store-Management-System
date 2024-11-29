import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'; // Import Pinia
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
const pinia = createPinia(); // Initialize Pinia

app.use(router);
app.use(pinia); // Add Pinia to the Vue app
app.mount('#app');
