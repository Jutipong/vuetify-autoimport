export const useLayoutStore = defineStore('layout', () => {
  const state = reactive({ drawer: true, isRail: false })

  function toggleDrawer() {
    state.drawer = !state.drawer
  }

  function toggleRail() {
    state.isRail = !state.isRail
  }

  return {
    state,
    toggleDrawer,
    toggleRail,
  }
})
