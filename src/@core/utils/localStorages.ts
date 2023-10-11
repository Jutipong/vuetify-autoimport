import { UserLogin } from '@/types/auth';

export const useLocalStorages = {
  ///////////
  // token //
  ///////////
  setToken: (token: string) => {
    sessionStorage.setItem(appConfig.tokenKey, token);
  },
  getToken: (): string | null => {
    const token = sessionStorage.getItem(appConfig.tokenKey);
    return token;
  },
  clearToken: () => sessionStorage.removeItem(appConfig.tokenKey),

  /////////////
  //user info//
  /////////////
  setUserInfo: (userInfo: UserLogin) => {
    sessionStorage.setItem(appConfig.userInfKey, JSON.stringify(userInfo));
  },
  getUserInfo: (): UserLogin | null => {
    const userInfo = sessionStorage.getItem(appConfig.userInfKey);
    return userInfo ? JSON.parse(userInfo) : null;
  },
  clearUserInfo: () => sessionStorage.removeItem(appConfig.userInfKey),
};
