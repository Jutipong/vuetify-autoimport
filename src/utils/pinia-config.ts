import ls from 'localstorage-slim'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

ls.config.storage = sessionStorage
ls.config.encrypt = true

const secureStorage = {
    getItem(key: string): string | null {
        return ls.get(key)
    },
    setItem(key: string, value: string): void {
        ls.set(key, value)
    },
    removeItem(key: string): void {
        ls.remove(key)
    },
}

const piniaConfig = createPinia()
piniaConfig.use(createPersistedState({
    storage: secureStorage,
}))

export { piniaConfig }
