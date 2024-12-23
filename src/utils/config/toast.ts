import type { PluginOptions } from 'vue-toastification'
import Toast from 'vue-toastification'

const toastConfig: PluginOptions = {
    transition: 'Vue-Toastification__bounce',
    timeout: 5000,
    maxToasts: 9,
    newestOnTop: true,
}

export { Toast, toastConfig }
