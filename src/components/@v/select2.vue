<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const textSearch = ref('')
const dataSelected = ref<Item | null>(null)
const items = ref([] as Item[])
const isLoading = ref(false)
const isFetchData = ref(false)
const minimumCharacters = ref(2)

const placeholder = computed(() => `minimum ${minimumCharacters.value} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')

async function fetchData(val?: string) {
    if (!isFetchData.value)
        return

    isLoading.value = true

    items.value = await api.Post<any>('customer/MasterSelect2', { name: val, pageSize: 10 }, {
        baseURL: 'http://localhost:5224/',
        isLoading: false,
    })

    isLoading.value = false
}

watchDebounced(textSearch, async (val: string) => {
    if (val.length < 2)
        return

    await fetchData(val)
}, { debounce: 1000 })

function onMenu(val: boolean) {
    isFetchData.value = val
}
</script>

<template>
    <v-autocomplete
        v-model:search="textSearch"
        v-model="dataSelected"
        :dirty="true"
        label="Select2"
        :items="items"
        :loading="isLoading"
        no-filter
        item-title="text"
        item-value="id"
        clearable
        return-object
        :placeholder="placeholder"
        :no-data-text="noDataText"
        @update:menu="onMenu"
    />
</template>
