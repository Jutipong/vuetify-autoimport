export const useLayoutStore = defineStore('layout', () => {
  const isRail = ref(true);
  const title = ref('vite vue3 vuetify ts');

  function toggleDrawer() {
    isRail.value = !isRail.value;
  }

  return {
    isRail,
    title,
    toggleDrawer,
  };
});
