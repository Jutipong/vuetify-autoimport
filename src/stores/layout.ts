export const useLayoutStore = defineStore('layout', () => {
    const { mobile } = useDisplay()

    const state = reactive({
        drawer: true,
        rail: true,
        theme: 'light',
    })

    function toggleDrawer() {
        if (mobile.value) {
            state.rail = false
            state.drawer = !state.drawer
        }
        else {
            state.rail = !state.rail
            state.drawer = true
        }
    }

    function setTheme(theme: string) {
        state.theme = theme
    }

    return {
        state,
        toggleDrawer,
        setTheme,
    }
}, {
    persist: {
        storage: localStorage,
        paths: ['state'],
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
