import ls from 'localstorage-slim'
import type { UserLogin } from '@/types/auth'

ls.config.storage = sessionStorage
ls.config.encrypt = true

export const clientStorages = {
    clear: () => {
        ls.clear()
    },
    setToken: (token: string) => {
        ls.set(appSetting.tokenKey, token)
    },
    getToken: (): string | null => {
        const token = ls.get<string | null>(appSetting.tokenKey)
        return token
    },
    setUserLogin: (userInfo: UserLogin) => {
        ls.set(appSetting.userLoginKey, userInfo)
    },
    getUserLogin: (): UserLogin | null => {
        const userInfo = ls.get<UserLogin | null>(appSetting.userLoginKey)
        return userInfo
    },
    setTheme: (theme: string): void => {
        localStorage.setItem('theme', theme)
    },
    getTheme: (): string => {
        return localStorage.getItem('theme') ?? 'light'
    },
}
