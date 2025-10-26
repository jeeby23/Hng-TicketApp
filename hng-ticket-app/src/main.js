import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'material-symbols';
import './assets/main.css'; // keep your existing styles
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.mount('#app')
