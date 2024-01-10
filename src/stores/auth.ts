import { UserLoginType } from '../types/auth'
import router from '@/@core/plugins/router'

export const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    loading: false,
  })

  async function logIn(username: string, password: string) {
    state.loading = true

    const req = {
      username: 'kminchelle',
      password: '0lelplR',
    }

    const res: UserLoginType = await api.post('/auth/login', req)

    useLocalStorages.setToken(res.token)
    useLocalStorages.setUserInfo(res)

    state.loading = false

    router.push('/')
  }

  async function logOut() {
    router.push('/login')
  }

  function _getUserInfo() {
    const val = useLocalStorages.getUserInfo()
    if (!val) {
      router.push('/login')
      return null
    }

    const userInfo: UserLoginType = val
    return userInfo
  }

  function isLogin() {
    let userInfo = _getUserInfo()
    return _isEmpty(userInfo) ? false : true
  }

  function getUserInfo(): UserLoginType {
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
