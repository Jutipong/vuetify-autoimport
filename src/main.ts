import { createApp } from 'vue'
import '@/assets/css/styles/index.scss'

import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'

import App from './App.vue'
import vuetify from '@/@core/plugins/vuetify'
import router from '@/@core/router'

import '@/assets/css/main.css'

import 'vue-toastification/dist/index.css'
import 'virtual:uno.css'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(piniaConfig)
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    timeout: 5000,
    maxToasts: 9,
    newestOnTop: true,
} as PluginOptions)
app.mount('#app')
