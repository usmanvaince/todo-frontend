import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './plugins/pinia'
import router from './router'
import './plugins/tailwind.css'
import Notifications from '@kyvg/vue3-notification'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'


const app = createApp(App).use(router).use(pinia).use(Notifications)
app.component('infinite-loading', InfiniteLoading)
app.mount('#app')
