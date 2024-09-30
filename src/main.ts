import type { PluginOptions } from 'vue-toastification'
import vuetify from '@/utils/config/vuetify/vuetify'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import App from './App.vue'

import '@/assets/sass/layout.scss'
import '@/assets/sass/mobile.scss'
import '@/assets/css/main.css'
import 'vue-toastification/dist/index.css'
import 'virtual:uno.css'
import 'vue3-perfect-scrollbar/style.css'

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
