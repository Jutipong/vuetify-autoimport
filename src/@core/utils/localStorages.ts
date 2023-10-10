import { UserLogin } from '@/types/auth';

export const useLocalStorages = {
  ///////////
  // token //
  ///////////
  setToken: (token: string) => {
    sessionStorage.setItem(consts.tokenKey, token);
  },
  getToken: (): string | null => {
    const token = sessionStorage.getItem(consts.tokenKey);
    return token;
  },
  clearToken: () => sessionStorage.removeItem(consts.tokenKey),

  /////////////
  //user info//
  /////////////
  setUserInfo: (userInfo: UserLogin) => {
    sessionStorage.setItem(consts.userInfKey, JSON.stringify(userInfo));
  },
  getUserInfo: (): UserLogin | null => {
    const userInfo = sessionStorage.getItem(consts.userInfKey);
    return userInfo ? JSON.parse(userInfo) : null;
  },
  clearUserInfo: () => sessionStorage.removeItem(consts.userInfKey),
};
