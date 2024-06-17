export const useLayoutStore = defineStore('layout', () => {
    const vuetify = useDisplay()

    const state = reactive({
        drawer: true,
        // isRail: false,
        isDrawerOpen: true,
    })
    // const isMobile = ref(getMobile())

    function toggleDrawer() {
        state.drawer = !state.drawer
    }

    const isRail = computed(() => {
        return !state.drawer && !vuetify.mobile.value
    })

    // watch(() => state.drawer, () => {
    //     if (vuetify.mobile.value) {
    //         state.isDrawerOpen = !!state.drawer
    //     }
    //     else {
    //         state.isDrawerOpen = !state.drawer || isRail
    //     }
    // })

    // function toggleRail() {
    //     state.isRail = !state.isRail
    // }

    // const isDrawerOpen = computed(() => !state.isRail)

    // function getMobile() {
    //     const rect = document.body.getBoundingClientRect()
    //     if (!document.hidden) {
    //         const res = rect.width - 1 < 777
    //         return res
    //     }
    //     else {
    //         return false
    //     }
    // };

    // window.addEventListener('resize', () => {
    //     const res = getMobile()
    //     if (res !== isMobile.value) {
    //         isMobile.value = res
    //     }
    // })

    return {
        state,
        // isMobile,
        isRail,
        toggleDrawer,
        // isDrawerOpen,
        // isDrawerOpen,
        // toggleRail,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
