export const useLayoutStore = defineStore('layout', () => {
    const state = reactive({
        drawer: true,
        isRail: false,
    })
    // const isMobile = ref(getMobile())

    function toggleDrawer() {
        state.drawer = !state.drawer
    }

    function toggleRail() {
        state.isRail = !state.isRail
    }

    const isDrawerOpen = computed(() => !state.isRail)

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
        toggleDrawer,
        isDrawerOpen,
        toggleRail,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot))
}
