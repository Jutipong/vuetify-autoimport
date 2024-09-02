<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: string | null
    minimumCharacters?: number
    pageSize?: number
    debounceTime?: TimeConfig
    baseUrl?: string
    url: string
    cache?: boolean
    cacheTimeout?: TimeConfig
}>(), {
    modelValue: null,
    minimumCharacters: 2,
    pageSize: 10,
    debounceTime: '1sec',
    cache: false,
    cacheTimeout: '5min',
})

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()
const vModel = ref<AutoComplateServer | null>(null)
const search = ref('')
const items = ref([] as AutoComplateServer[])
const isServerError = ref(false)

const isLoading = ref(false)
const isFetchData = ref(false)

const func = {
    fetchData: async (text: string, idInit?: string) => {
        if (!isFetchData.value)
            return

        isLoading.value = true

        try {
            isServerError.value = false

            const res = await api.Post<AutoComplateServer[]>(props.url, {
                textSearch: text,
                idInit: idInit?.length ? [idInit] : null,
                pageSize: props.pageSize,
            }, {
                baseURL: props.baseUrl,
                isLoading: false,
                cache: props.cache,
                cacheTimeout: props.cacheTimeout,
            })

            if (idInit) {
                const result = res.find(r => r.id === idInit)
                items.value = result ? [result] : []
                vModel.value = result ?? null
                return
            }

            items.value = res
        }
        catch {
            isServerError.value = true
            items.value = []
        }
        finally {
            isLoading.value = false
        }
    },
    onMenu: (val: boolean) => {
        isFetchData.value = val
    },
}

onBeforeMount(async () => {
    if (!props.modelValue)
        return

    // if (idInit?.length === 0)
    //     return

    isFetchData.value = true
    await func.fetchData('', props.modelValue)
    isFetchData.value = false
})

watchDebounced(search, async (strSearch: string) => {
    if (strSearch.length < props.minimumCharacters)
        return

    if (items.value.some(x => x.text === strSearch))
        return

    await func.fetchData(strSearch)
}, { debounce: _dateTime.GetTimeConfig(props.debounceTime) })

watch(vModel, (newVal: AutoComplateServer | null, oldVal: AutoComplateServer | null) => {
    if (newVal?.id === oldVal?.id || props.modelValue === newVal)
        return

    emit('update:modelValue', newVal?.id ?? null)
})

watch(() => props.modelValue, async (newVal: string | null) => {
    if (vModel.value?.id === newVal)
        return

    if (!newVal)
        return vModel.value = null

    isFetchData.value = true
    await func.fetchData('', newVal)
    isFetchData.value = false
})

const placeholder = computed(() => `minimum ${props.minimumCharacters} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')
</script>

<template>
    <v-autocomplete
        v-model:search="search"
        v-model="vModel"
        :dirty="true"
        :items="items"
        :loading="isLoading"
        no-filter
        item-title="text"
        item-value="id"
        clearable
        return-object
        :placeholder="placeholder"
        :no-data-text="noDataText"
        :error-messages="isServerError ? `Server err: ${props.baseUrl}${props.url}` : ''"
        @update:menu="func.onMenu"
    />
</template>
