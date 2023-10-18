import { defineStore, acceptHMRUpdate } from 'pinia';

export const useGlobalStore = defineStore('global', () => {
  const state = reactive({
    loading: false,
  });

  return {
    state,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
