import type { UserLogin } from '../types/auth'
import router from '@/@core/plugins/router'

const { setToken, setUserLogin } = clientStorages

export const useLoginStore = defineStore('login', () => {
    const state = reactive({ isLoading: false })

    async function logIn(username: string, password: string): Promise<void> {
        state.isLoading = true

        const res = await api.post<UserLogin>('/auth/login', { username, password }, { isLoading: false })

        setToken(res.token)
        setUserLogin(res)

        state.isLoading = false

        router.push('/')
    }

    async function logOut(alertConfirm: boolean = true): Promise<void> {
        if (alertConfirm) {
            if (!await vConfirm.info('Logout!', `<div style="font-size: 60px; display: flex; justify-content: space-around; color:#FF4C51" class="mdi mdi-close"></div>
             <h3>Are you sure you want to log out?</h3>`, {
                iconTitle: 'mdi-logout',
                btnOk: {
                    color: 'error',
                    text: 'Log out',
                    icon: 'mdi-logout',
                },
                // btnCancelDisabled: true,
                // btnOkDisabled: true,
            }))
                return
        }

        router.replace('/login')
    }

    return {
        state,
        logIn,
        logOut,
    }
})
