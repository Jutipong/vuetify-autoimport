import type { PluginOptions } from 'vue-toastification'
import vuetify from '@/utils/config/vuetify/vuetify'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'

import '@/assets/css/styles/index.scss'

import '@/assets/css/main.css'
import 'vue-toastification/dist/index.css'
import 'virtual:uno.css'

document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)
app.use(vuetify)
app.use(routerConfig)
app.use(piniaConfig)
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    timeout: 5000,
    maxToasts: 9,
    newestOnTop: true,
} as PluginOptions)
app.mount('#app')
