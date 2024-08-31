<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type { TimeConfigType } from '@/utils/dateTime'

type debounceTime = '1sec' | '2sec' | '3sec' | '4sec'

const props = withDefaults(defineProps<{
    minimumCharacters?: number
    pageSize?: number
    debounceTime?: debounceTime
    baseUrl?: string
    url: string
    cache?: boolean
    cacheTimeout?: TimeConfigType
}>(), {
    minimumCharacters: 2,
    pageSize: 10,
    cache: true,
    cacheTimeout: '5min',
})
const val = defineModel<string | null>()
const textSearch = ref('')
const items = ref([] as Select2<string>[])

const isLoading = ref(false)
const isFetchData = ref(false)

const placeholder = computed(() => `minimum ${props.minimumCharacters} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')

const func = {
    fetchData: async (val: string) => {
        if (!isFetchData.value)
            return

        isLoading.value = true

        try {
            items.value = await api.Post<Select2<string>[]>(props.url, {
                name: val,
                pageSize: props.pageSize,
            }, {
                baseURL: props.baseUrl,
                isLoading: false,
                cache: true,
                cacheTimeout: '5min',
            })
        }
        finally {
            isLoading.value = false
        }
    },
    onMenu: (val: boolean) => {
        isFetchData.value = val
    },
    getDebounceTime: () => {
        switch (props.debounceTime) {
            case '1sec':
                return 1000
            case '2sec':
                return 2000
            case '3sec':
                return 3000
            case '4sec':
                return 4000
            default:
                return 1000
        }
    },
}

watchDebounced(textSearch, async (val: string) => {
    if (val.length < props.minimumCharacters)
        return

    await func.fetchData(val)
}, { debounce: func.getDebounceTime() })
</script>

<template>
    <v-autocomplete
        v-model:search="textSearch"
        v-model="val"
        :dirty="true"
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
