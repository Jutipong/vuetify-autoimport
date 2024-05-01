/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// import '@/scss/style.scss';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import _ from 'lodash'
import App from './App.vue'

import vuetify from '@/@core/plugins/vuetify'
import router from '@/@core/plugins/router'

import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(createPinia())
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  timeout: 5000,
  maxToasts: 9,
  newestOnTop: true,
} as PluginOptions)
app.mount('#app')
