import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/styles/index.scss'
import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'
import ls from 'localstorage-slim'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import vuetify from '@/@core/plugins/vuetify'
import router from '@/@core/router'

import '@/assets/css/main.css'

import 'vue-toastification/dist/index.css'
import 'virtual:uno.css'

ls.config.storage = sessionStorage
ls.config.encrypt = true

const secureStorage = {
    getItem: (key: string): string | null => {
        if (key.endsWith('-encrypt')) {
            return ls.get(key)
        }
        else {
            return sessionStorage.getItem(key)
        }
    },
    setItem: (key: string, value: string) => {
        if (key.endsWith('-encrypt')) {
            ls.set(key, value)
        }
        else {
            sessionStorage.setItem(key, value)
        }
    },
    removeItem: (key: string) => {
        if (key.endsWith('-encrypt')) {
            ls.remove(key)
        }
        else {
            sessionStorage.removeItem(key)
        }
    },
}

const pinia = createPinia()

pinia.use(createPersistedState({
    storage: secureStorage,
}))

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(pinia)
app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    timeout: 5000,
    maxToasts: 9,
    newestOnTop: true,
} as PluginOptions)
app.mount('#app')
