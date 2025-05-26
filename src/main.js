import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/style.css'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia()) // <-- Add this line
app.use(router)
app.mount('#app')
