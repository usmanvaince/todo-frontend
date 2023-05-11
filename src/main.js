import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './plugins/pinia'
import router from './router';
import './plugins/tailwind.css';

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
