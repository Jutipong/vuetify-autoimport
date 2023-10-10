import { UserLogin } from '@/types/auth';

export const useLocalStorages = {
  ///////////
  // token //
  ///////////
  setToken: (token: string) => {
    sessionStorage.setItem(useConst.tokenKey, token);
  },
  getToken: (): string | null => {
    const token = sessionStorage.getItem(useConst.tokenKey);
    return token;
  },
  clearToken: () => sessionStorage.removeItem(useConst.tokenKey),

  /////////////
  //user info//
  /////////////
  setUserInfo: (userInfo: UserLogin) => {
    sessionStorage.setItem(useConst.userInfKey, JSON.stringify(userInfo));
  },
  getUserInfo: (): UserLogin | null => {
    const userInfo = sessionStorage.getItem(useConst.userInfKey);
    return userInfo ? JSON.parse(userInfo) : null;
  },
  clearUserInfo: () => sessionStorage.removeItem(useConst.userInfKey),
};
