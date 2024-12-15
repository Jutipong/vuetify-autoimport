import type { PluginOptions } from 'vue-toastification'
import vuetify from '@/utils/config/vuetify/vuetify'

import { createApp } from 'vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import Toast from 'vue-toastification'

import App from './App.vue'
import { piniaConfig } from './utils/config/pinia'

import { routerConfig } from './utils/config/router'
import './assets/sass/style.scss'
import 'virtual:uno.css'

document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)
app.use(vuetify)
app.use(PerfectScrollbarPlugin)
app.use(routerConfig)
app.use(piniaConfig)
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    timeout: 5000,
    maxToasts: 9,
    newestOnTop: true,
} as PluginOptions)
app.mount('#app')
