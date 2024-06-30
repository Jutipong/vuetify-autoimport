export const useAppStore = defineStore('app', () => {
    const loadings = ref(0)
    const isProgressLoading = ref(false)

    const isLoading = computed(() => loadings.value > 0)

    function setLoading() {
        loadings.value++
    }

    function unLoading() {
        loadings.value--
    }

    function resetLoading() {
        loadings.value = 0
    }

    return {
        isLoading,
        isProgressLoading,
        setLoading,
        unLoading,
        resetLoading,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
