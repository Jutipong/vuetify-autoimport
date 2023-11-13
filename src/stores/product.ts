export const useProductStore = defineStore('product', () => {
  const globalStore = useGlobalStore();

  const state = reactive({
    data: {
      status: null,
    },
    master: {
      status: [
        { id: true, text: 'Active' },
        { id: false, text: 'InActive' },
      ],
    },
  });

  return {
    state,
  };
});
