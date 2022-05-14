import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import 'flowbite'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Register components in your 'main.js'

const app = createApp(App);
app.use(router)
app.component('Datepicker', Datepicker);


app.mount('#app');
// createApp(App).use(router).mount('#app')
