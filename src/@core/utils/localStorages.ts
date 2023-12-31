import { UserLoginType } from '@/types/auth'
const { app } = useConstant
export const useLocalStorages = {
  ///////////
  // token //
  ///////////
  setToken: (token: string) => {
    sessionStorage.setItem(app.tokenKey, token)
  },
  getToken: (): string | null => {
    const token = sessionStorage.getItem(app.tokenKey)
    return token
  },
  clearToken: () => sessionStorage.removeItem(app.tokenKey),

  /////////////
  //user info//
  /////////////
  setUserInfo: (userInfo: UserLoginType) => {
    sessionStorage.setItem(app.userInfKey, JSON.stringify(userInfo))
  },
  getUserInfo: (): UserLoginType | null => {
    const userInfo = sessionStorage.getItem(app.userInfKey)
    return userInfo ? JSON.parse(userInfo) : null
  },
  clearUserInfo: () => sessionStorage.removeItem(app.userInfKey),
}
