export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)
    const user = ref<UserLogin | null>(null)

    function clearAuth() {
        token.value = null
        user.value = {} as UserLogin
    }

    function setToken(value: string) {
        token.value = value
    }

    function setUser(value: UserLogin) {
        user.value = value
    }

    return {
        token,
        user,
        setToken,
        setUser,
        clearAuth,
    }
}, {
    persist: {
        key: 'auth-encrypt',
        paths: ['token', 'user'],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
