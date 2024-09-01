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
    cache: true,
    cacheTimeout: '5min',
})

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()
const stateValue = ref<AutoComplateServer | null>(null)
const textSearch = ref('')
const items = ref([] as AutoComplateServer[])

const isLoading = ref(false)
const isFetchData = ref(false)

const func = {
    fetchData: async (text: string, idInit?: string[]) => {
        if (!isFetchData.value)
            return

        if (idInit?.length === 0)
            return

        const isDataInOptions = items.value.some(x => x.text === text)
        if (isDataInOptions)
            return

        isLoading.value = true

        try {
            const res = await api.Post<AutoComplateServer[]>(props.url, {
                textSearch: text,
                idInit,
                pageSize: props.pageSize,
            }, {
                baseURL: props.baseUrl,
                isLoading: false,
                cache: props.cache,
                cacheTimeout: props.cacheTimeout,
            })

            if (idInit?.length) {
                const result = res.filter(r => r.id === idInit[0])
                items.value = result
                stateValue.value = result[0]
            }
            else {
                items.value = res
            }
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

    isFetchData.value = true
    await func.fetchData('', [props.modelValue])
    isFetchData.value = false
})

watchDebounced(textSearch, async (val: string) => {
    if (val.length < props.minimumCharacters)
        return

    await func.fetchData(val)
}, { debounce: _dateTime.GetTimeConfig(props.debounceTime) })

watch(stateValue, (newVal: AutoComplateServer | null, oldVal: AutoComplateServer | null) => {
    if (newVal?.id === oldVal?.id)
        return

    emit('update:modelValue', newVal?.id ?? null)
})

watch(() => props.modelValue, async (newVal: string | null) => {
    if (stateValue.value?.id === newVal)
        return

    if (!newVal)
        return stateValue.value = null

    isFetchData.value = true
    await func.fetchData('', [newVal])
    isFetchData.value = false
})

const placeholder = computed(() => `minimum ${props.minimumCharacters} characters`)
const noDataText = computed(() => isLoading.value ? 'Loading...' : 'No data found')
</script>

<template>
    <v-autocomplete
        v-model:search="textSearch"
        v-model="stateValue"
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
        @update:menu="func.onMenu"
    />
</template>
