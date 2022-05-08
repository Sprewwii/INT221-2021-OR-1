import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import 'flowbite'
// Register components in your 'main.js'


createApp(App).use(router).mount('#app')
