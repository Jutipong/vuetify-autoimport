<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const { minimumCharacters, pageSize, debounceTime } = withDefaults(defineProps<{
    minimumCharacters?: number
    pageSize?: number
    debounceTime?: number
}>(), {
    minimumCharacters: 2,
    pageSize: 10,
    debounceTime: 1000,
})

const textSearch = ref('')
const dataSelected = ref<Item | null>(null)
const items = ref([] as Item[])
const isLoading = ref(false)
const isFetchData = ref(false)

const placeholder = computed(() => `minimum ${minimumCharacters} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')

const func = {
    fetchData: async (val: string) => {
        if (!isFetchData.value)
            return

        isLoading.value = true

        items.value = await api.Post<any>('customer/MasterSelect2', { name: val, pageSize }, {
            baseURL: 'http://localhost:5224/',
            isLoading: false,
            cache: true,
            cacheTimeout: '5min',
        })

        isLoading.value = false
    },
    onMenu: (val: boolean) => {
        isFetchData.value = val
    },
}

watchDebounced(textSearch, async (val: string) => {
    if (val.length < minimumCharacters)
        return

    await func.fetchData(val)
}, { debounce: debounceTime })
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
        :placeholder="placeholder"
        :no-data-text="noDataText"
        @update:menu="func.onMenu"
    />
</template>
