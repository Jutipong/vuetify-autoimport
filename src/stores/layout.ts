export const useLayoutStore = defineStore('layout', () => {
  const drawer = ref(true);

  function toggleDrawer() {
    drawer.value = !drawer.value;
  }

  return {
    drawer,
    toggleDrawer,
  };
});
