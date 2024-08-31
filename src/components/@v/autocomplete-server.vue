<script setup lang="ts">
type debounceTime = '1sec' | '2sec' | '3sec' | '4sec'

const props = withDefaults(defineProps<{
    minimumCharacters?: number
    pageSize?: number
    debounceTime?: debounceTime
    baseUrl?: string
    url: string
    cache?: boolean
    cacheTimeout?: TimeConfig
}>(), {
    minimumCharacters: 2,
    pageSize: 10,
    cache: true,
    cacheTimeout: '5min',
})

const val = defineModel<AutoComplateServer | null>()
const textSearch = ref('')
const items = ref([] as AutoComplateServer[])

const isLoading = ref(false)
const isFetchData = ref(false)

const placeholder = computed(() => `minimum ${props.minimumCharacters} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')

const func = {
    fetchData: async (text: string, idInit?: string[]) => {
        if (!isFetchData.value)
            return

        const isDataInOptions = items.value.some(x => x.text === text)
        if (isDataInOptions)
            return

        isLoading.value = true

        try {
            items.value = await api.Post<AutoComplateServer[]>(props.url, {
                textSearch: text,
                idInit,
                pageSize: props.pageSize,
            }, {
                baseURL: props.baseUrl,
                isLoading: false,
                cache: props.cache,
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

onBeforeMount(async () => {
    if (!val.value)
        return

    items.value = [val.value]
})

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
        return-object
        @update:menu="func.onMenu"
    />
</template>
