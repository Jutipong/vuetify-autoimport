import { UserLogin } from '../types/auth';
import router from '@/@core/plugins/router';

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    loading: false,
  });

  async function logIn(username: string, password: string) {
    state.loading = true;

    await fetch(`${consts.url.api}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        useLocalStorages.setToken(data.token);
        useLocalStorages.setUserInfo(data);
      });

    state.loading = false;

    router.push('/');
  }

  async function logOut() {
    router.push('/login');
  }

  function _getUserInfo() {
    const val = useLocalStorages.getUserInfo();
    if (!val) {
      router.push('/login');
      return null;
    }

    const userInfo: UserLogin = val;
    return userInfo;
  }

  function isLogin() {
    let userInfo = _getUserInfo();
    return _isEmpty(userInfo) ? false : true;
  }

  function getUserInfo(): UserLogin {
    const userInfo = _getUserInfo()!;
    return userInfo;
  }

  function getToken() {
    const token = useLocalStorages.getToken();
    return token;
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
