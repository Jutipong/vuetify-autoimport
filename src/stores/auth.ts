import { UserLogin } from '../types/auth';
import router from '@/@core/plugins/router';

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({ loading: false });
  const user_login = 'user_login';

  async function logIn(username: string, password: string) {
    state.loading = true;

    await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(user_login, JSON.stringify(data));
      });

    state.loading = false;
    router.replace('/');
  }

  async function logOut(): Promise<void> {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem(user_login);
      clearTimeout(timeout);
    }, 200);

    router.replace('/login');
  }

  function _getUserInfo(): UserLogin | null {
    const userLoin = sessionStorage.getItem(user_login);
    if (!userLoin) return null;

    const user: UserLogin = JSON.parse(userLoin);
    return user;
  }

  function isLogin(): boolean {
    let userInfo = _getUserInfo();
    return userInfo ? true : false;
  }

  function getUserInfo(): UserLogin {
    const userInfo = _getUserInfo()!;
    return userInfo;
  }

  function getToken(): string | null {
    const userInfo = _getUserInfo();
    if (!userInfo) return null;

    return userInfo.token;
  }

  return {
    state,
    isLogin,
    getToken,
    getUserInfo,
    logIn,
    logOut,
  };
});
