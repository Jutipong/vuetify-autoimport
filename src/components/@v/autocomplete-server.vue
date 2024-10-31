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
    modelValue: string | null
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

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const vModel = ref<AutoCompleteServer | null>(null)
const search = ref('')
const items = ref([] as AutoCompleteServer[])
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

            const res = await api.Post<AutoCompleteServer[]>(url, {
                textSearch: text,
                idInit: idInit?.length ? [idInit] : null,
                pageSize,
            }, {
                baseURL: baseUrl,
                isLoading: false,
                cache,
                cacheTimeout,
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
    if (!modelValue)
        return

    isFetchData.value = true
    await func.fetchData('', modelValue)
    isFetchData.value = false
})

watchDebounced(search, async (strSearch: string) => {
    if (strSearch.length < minimumCharacters)
        return

    if (items.value.some(x => x.text === strSearch))
        return

    await func.fetchData(strSearch)
}, { debounce: _dateTime.TimeConfig(debounceTime) })

watch(vModel, (newVal: AutoCompleteServer | null, oldVal: AutoCompleteServer | null) => {
    if (newVal?.id === oldVal?.id || newVal === modelValue)
        return

    emit('update:modelValue', newVal?.id ?? null)
})

watch(() => modelValue, async (newVal: string | null) => {
    if (vModel.value?.id === newVal)
        return

    if (!newVal)
        return vModel.value = null

    isFetchData.value = true
    await func.fetchData('', newVal)
    isFetchData.value = false
})
</script>

<template>
    <VAutocomplete
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
