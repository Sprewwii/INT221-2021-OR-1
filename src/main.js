import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import 'flowbite'
import VueTailwindModal from "vue-tailwind-modal"

createApp(App).use(router).mount('#app')
