import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/style.css'
import router from './router'
import App from './App.vue'
import i18n from './i18n';

const app = createApp(App)
app.use(createPinia()) // <-- Add this line
app.use(i18n);
app.use(router)
app.mount('#app')
