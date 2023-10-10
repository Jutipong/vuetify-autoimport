export const useLayoutStore = defineStore('layout', () => {
  const title = ref('vite vue3 vuetify ts');

  const drawer = ref(true);

  function toggleDrawer() {
    drawer.value = !drawer.value;
  }

  return {
    title,
    drawer,
    toggleDrawer,
  };
});
