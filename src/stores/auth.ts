import type { UserLogin } from '../types/auth'
import router from '@/@core/plugins/router'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    loading: false,
  })

  async function logIn(username: string, password: string) {
    state.loading = true

    const req = { username, password }

    const res: UserLogin = await api.post('/auth/login', req)

    useLocalStorages.setToken(res.token)
    useLocalStorages.setUserInfo(res)

    state.loading = false

    router.push('/')
  }

  async function logOut() {
    if (!await vConfirm.info('Logout!', 'Are you sure you want to log out?', {
      iconTitle: 'mdi-logout',
      btnOk: {
        color: 'error',
        text: 'Log out',
        icon: 'mdi-logout',
      },
    }))
      return

    router.push('/login')
  }

  function _getUserInfo() {
    const val = useLocalStorages.getUserInfo()
    if (!val) {
      router.push('/login')
      return null
    }

    const userInfo: UserLogin = val
    return userInfo
  }

  function isLogin() {
    const userInfo = _getUserInfo()
    return !_isEmpty(userInfo)
  }

  function getUserInfo(): UserLogin {
    const userInfo = _getUserInfo()!
    return userInfo
  }

  function getToken() {
    const token = useLocalStorages.getToken()
    return token
  }

  return {
    state,
    isLogin,
    getToken,
    getUserInfo,
    logIn,
    logOut,
  }
})
