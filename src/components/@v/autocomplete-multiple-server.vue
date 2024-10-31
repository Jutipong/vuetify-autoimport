<script setup lang="ts">
const {
    modelValue = null,
    minimumCharacters = 2,
    noDataMessage = 'No data found',
    loadingMessage = 'Loading...',
    pageSize = 10,
    debounceTime = '1sec',
    url,
    baseUrl,
    cache = false,
    cacheTimeout = '5min',
} = defineProps<{
    modelValue: string[] | null
    minimumCharacters?: number
    noDataMessage?: string
    loadingMessage?: string
    pageSize?: number
    debounceTime?: TimeConfig
    baseUrl?: string
    url: string
    cache?: boolean
    cacheTimeout?: TimeConfig
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string[] | null] }>()

const vModel = ref<AutoCompleteServer[] | null>(null)
const search = ref('')
const items = ref([] as AutoCompleteServer[])
const isServerError = ref(false)

const isLoading = ref(false)
const isFetchData = ref(false)

const func = {
    fetchData: async (text: string, idsInit?: string[]) => {
        if (!isFetchData.value)
            return

        isLoading.value = true

        try {
            isServerError.value = false

            const res = await api.Post<AutoCompleteServer[]>(url, {
                textSearch: text,
                idInit: idsInit?.length ? idsInit : null,
                pageSize,
            }, {
                baseURL: baseUrl,
                isLoading: false,
                cache,
                cacheTimeout,
            })

            if (idsInit?.length) {
                const result = res.filter(r => idsInit.includes(r.id))
                items.value = result || []
                vModel.value = result ?? null
                return
            }

            items.value = [...items.value, ...res.filter(r => !items.value.map(r2 => r2.id).includes(r.id))]
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
    if (!modelValue)
        return

    isFetchData.value = true
    await func.fetchData('', modelValue)
    isFetchData.value = false
})

watchDebounced(search, async (strSearch) => {
    if ((strSearch?.length ?? 0) < minimumCharacters)
        return

    if (items.value.some(x => x.text === strSearch))
        return

    await func.fetchData(strSearch)
}, { debounce: _dateTime.TimeConfig(debounceTime) })

watch(vModel, (newVal, oldVal) => {
    const newIds = newVal?.map(r => r.id) ?? []
    const oldIds = oldVal?.map(r => r.id) ?? []

    if (newIds.length === oldIds.length && newIds?.every(newId => oldIds?.some(id => id === newId)))
        return

    const propsIds = modelValue?.map(id => id) ?? []

    if (newVal?.length === propsIds?.length && newIds?.every(newId => propsIds?.some(propsId => propsId === newId)))
        return

    emit('update:modelValue', newVal?.length ? newVal.map(r => r.id) : null)
})

watch(() => modelValue, async (newVal) => {
    const newIds = newVal?.map(id => id) ?? []
    const vModelId = vModel.value?.map(r => r.id) ?? []

    if (!newVal?.length)
        return vModel.value = null

    if (newIds?.every(newId => vModelId?.some(id => id === newId)))
        return

    isFetchData.value = true
    await func.fetchData('', newVal)
    isFetchData.value = false
})
</script>

<template>
    <VAutocomplete
        v-model:search="search"
        v-model="vModel"

        :closable-chips="true"

        :dirty="true"
        :items="items"
        :loading="isLoading"

        item-title="text"
        item-value="id"

        no-filter clearable return-object chips multiple
        :placeholder="`minimum ${minimumCharacters} characters`"
        :no-data-text="isLoading ? `${loadingMessage ?? 'Loading...'}` : `${noDataMessage ?? 'No data found'}`"
        :error-messages="isServerError ? `url error: ${baseUrl}${url}` : ''"
        @update:menu="func.onMenu"
    >
        <template v-if="isLoading" #append-inner>
            <v-icon size="34" color="success" icon="mdi mdi-loading" animate-spin />
        </template>
    </VAutocomplete>
</template>
