import vuetify from '@/utils/config/vuetify/vuetify'

import { createApp } from 'vue'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'

import App from './App.vue'

import { piniaConfig } from './utils/config/pinia'
import { routerConfig } from './utils/config/router'
import { Toast, toastConfig } from './utils/config/toast'

import './assets/sass/style.scss'
import 'virtual:uno.css'

document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)
app.use(vuetify)
app.use(PerfectScrollbarPlugin)
app.use(piniaConfig)
app.use(routerConfig)
app.use(Toast, toastConfig)
app.mount('#app')
