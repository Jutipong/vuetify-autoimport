<!-- <script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const loading = ref(false)
const items = ref<Item[]>([])
const search = ref<string | null>(null)
const selected = ref<Item | null>(null)

const querySelections = useDebounceFn(async (query: string) => {
    if (!query)
        return

    loading.value = true
    try {
    // จำลองการเรียก API
        const response = await fetch(`https://api.example.com/search?query=${query}`)
        const data = await response.json()
        items.value = data.results
    }
    catch (error) {
        console.error('Error fetching data:', error)
    }
    finally {
        loading.value = false
    }
}, 500)

watch(search, (newValue) => {
    if (newValue && newValue !== selected.value?.name) {
        querySelections(newValue)
    }
})

// onMounted(async () => {
//     const res = await api.Post<any>('customer/Inquiry', { name: 'string' }, { baseURL: 'http://localhost:5224/' })
//     items.value = res.map((item: any, index: number) => ({ id: index, name: `${item.name} - ${index}` }))
// })
</script>

<template>
    search: {{ search }}
    selected: {{ selected }}
    <v-autocomplete
        v-model="selected"
        v-model:search-input.lazy="search"
        :loading="loading"
        :items="items"
        item-title="name"
        item-value="id"
        label="เลือกรายการ"
        placeholder="พิมพ์เพื่อค้นหา"
    />
</template> -->

<!-- <script setup lang="ts"> -->
// import { useDebounceFn } from '@vueuse/core'
// const searchTerm = ref('')
// const selectedItem = ref(null)
// const searchTerm = ref<string | null>(null)
// const selectedItem = ref<Item | null>(null)
// const items = ref([])
// const isLoading = ref(false)
// const page = ref(1)

// watch(searchTerm, (term) => {
//     debugger
//     if (term) {
//         fetchResults(term, page.value)
//     }
//     else {
//         items.value = []
//     }
// })

// const querySelections = useDebounceFn(async (query: string, pageNumber: number) => {
//     if (!query)
//         return

//     isLoading.value = true
//     const res = await api.Post<any>('customer/Inquiry', { name: 'string' }, { baseURL: 'http://localhost:5224/' })
//     items.value = res.map((item: any, index: number) => ({ id: index, name: `${item.name} - ${index}` }))
//     console.log('items', items.value)
//     isLoading.value = false
// }, 2000)

// watch(searchTerm, (newValue) => {
//     if (newValue && newValue !== selectedItem.value?.name) {
//         querySelections(newValue, page.value)
//     }
// })

// function onScrollBottom() {
//     debugger
//     page.value++
//     fetchResults(searchTerm.value, page.value)
// }

// function onInput(value: any) {
//     debugger
//     // Handle selected item
// }
<!-- </script> -->

<template>
    search: {{ searchTerm }}
    selected: {{ selectedItem }}
    <v-autocomplete
        v-model:search-input="searchTerm"
        :items="items"
        :loading="isLoading"
        cache-items
        flat
        hide-no-data
        hide-details
        label="Search"
        item-title="name"
        item-value="id"
        solo-inverted
        @scroll-bottom="onScrollBottom"
    />
    <!-- @input="onInput" -->
</template>
