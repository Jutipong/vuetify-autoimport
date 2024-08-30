<script setup lang="ts">
import { fa } from 'vuetify/locale'

const search = ref('')
const items = ref([] as Item[])
const isLoading = ref(false)
const selected = ref<Item | null>(null)
const isLoadData = ref(false)

async function fetchData(val?: string) {
    return await api.Post<any>('customer/MasterSelect2', { name: val, pageSize: 10 }, {
        baseURL: 'http://localhost:5224/',
        isLoading: false,
    })
}

const onInput = _.debounce(async (val: string) => {
    if (!isLoadData.value)
        return

    isLoading.value = true
    items.value = await fetchData(val)
    isLoading.value = false
}, 600)

onMounted(() => {
    watch(search, (val: string) => {
        if (val.length < 2)
            return

        onInput(val)
    })
})

function onMenu(val: boolean) {
    isLoadData.value = val
}
</script>

<template>
    <v-autocomplete
        v-model:search="search"
        v-model="selected"
        :dirty="true"
        label="Select2"
        :items="items"
        :loading="isLoading"
        no-filter
        item-title="text"
        item-value="id"
        clearable
        return-object
        placeholder="minimum 2 characters"
        @update:menu="onMenu"
    />
</template>
