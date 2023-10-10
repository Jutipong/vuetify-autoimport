export const useLayoutStore = defineStore('layout', () => {
  const state = reactive({ drawer: true });

  function toggleDrawer() {
    state.drawer = !state.drawer;
  }

  return {
    state,
    toggleDrawer,
  };
});
