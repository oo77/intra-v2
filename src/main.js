import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import i18n from './i18n/index.js'
import AOS from 'aos'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
})