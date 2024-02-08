import ls from 'localstorage-slim'
import type { UserLogin } from '@/types/auth'

ls.config.storage = sessionStorage
ls.config.encrypt = true

export const clientStorages = {
  clear: () => {
    ls.clear()
  },
  setToken: (token: string) => {
    ls.set(_const.app.tokenKey, token)
  },
  getToken: (): string | null => {
    const token = ls.get<string | null>(_const.app.tokenKey)
    return token
  },
  setUserLogin: (userInfo: UserLogin) => {
    ls.set(_const.app.userLoginKey, userInfo)
  },
  getUserLogin: (): UserLogin | null => {
    const userInfo = ls.get<UserLogin | null>(_const.app.userLoginKey)
    return userInfo
  },
  setTheme: (theme: string): void => {
    ls.set('theme', theme)
  },
  getTheme: (): string => {
    const theme = ls.get<string | null>('theme') ?? 'light'
    return theme
  },
}
