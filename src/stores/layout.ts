import { el } from 'vuetify/locale'

export const useLayoutStore = defineStore('layout', () => {
    const { mobile } = useDisplay()

    const state = reactive({
        drawer: true,
        rail: false,
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

    return {
        state,
        toggleDrawer,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
