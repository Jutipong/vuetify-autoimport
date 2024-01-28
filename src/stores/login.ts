import type { UserLogin } from '../types/auth'
import router from '@/@core/plugins/router'

const { setToken, setUserInfo } = useLocalStorages

export const useLoginStore = defineStore('login', () => {
  const state = reactive({ isLoading: false })

  async function logIn(username: string, password: string): Promise<void> {
    state.isLoading = true

    const res: UserLogin = await api.post(
      '/auth/login',
      { username, password },
      { isLoading: false },
    )

    setToken(res.token)
    setUserInfo(res)

    state.isLoading = false

    router.push('/')
  }

  async function logOut(alertConfirm: boolean = true): Promise<void> {
    if (alertConfirm) {
      if (!await vConfirm.info('Logout!', 'Are you sure you want to log out?', {
        iconTitle: 'mdi-logout',
        btnOk: {
          color: 'error',
          text: 'Log out',
          icon: 'mdi-logout',
        },
      }))
        return
    }

    router.push('/login')
  }

  return {
    state,
    logIn,
    logOut,
  }
})
