import ls from 'localstorage-slim'
import type { UserLogin } from '@/types/auth'

const { app } = useConstant

ls.config.storage = sessionStorage
ls.config.encrypt = true

export const useLocalStorages = {
  clearLocalStorage: () => {
    ls.clear()
  },
  setToken: (token: string) => {
    ls.set(app.tokenKey, token)
  },
  getToken: (): string | null => {
    const token = ls.get<string | null>(app.tokenKey)
    return token
  },
  setUserInfo: (userInfo: UserLogin) => {
    ls.set(app.userInfKey, userInfo)
  },
  getUserInfo: (): UserLogin | null => {
    const userInfo = ls.get<UserLogin | null>(app.userInfKey)
    return userInfo
  },
}
