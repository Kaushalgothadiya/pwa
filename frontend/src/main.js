import './assets/main.css'
import { createApp } from 'vue'
import { FrappeUI } from 'frappe-ui'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)
app.use(router)
app.use(FrappeUI);
app.use(Toast);
app.mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/assets/pwa/frontend/sw.js');
    });
  }
