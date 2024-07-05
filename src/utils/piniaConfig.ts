import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import ls from 'localstorage-slim'

ls.config.storage = sessionStorage
ls.config.encrypt = true

const secureStorage = {
    getItem(key: string): string | null {
        return key.endsWith('-encrypt') ? ls.get(key) : sessionStorage.getItem(key)
    },
    setItem(key: string, value: string): void {
        key.endsWith('-encrypt') ? ls.set(key, value) : sessionStorage.setItem(key, value)
    },
    removeItem(key: string): void {
        key.endsWith('-encrypt') ? ls.remove(key) : sessionStorage.removeItem(key)
    },
}

const piniaConfig = createPinia()
piniaConfig.use(createPersistedState({
    storage: secureStorage,
}))

export { piniaConfig }
