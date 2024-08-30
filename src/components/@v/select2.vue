<script setup lang="ts">
const search = ref(null)
const items = ref([] as Item[])
const isLoading = ref(false)
const selected = ref<Item | null>(null)

async function onInput(val: any) {
    if (!val) {
        // items.value = []
        return false
    }

    const res = await api.Post<any>('customer/Inquiry', { name: val }, { baseURL: 'http://localhost:7213/' })
    items.value = res.map((item: any) => ({ id: res.Id, name: `${item.name}` }))
}
</script>

<template>
    item: {{ items }}
    <v-autocomplete
        v-model:search-input.lazy="search"
        v-model="selected"
        :items="items"
        :loading="isLoading"
        no-filter
        item-title="name"
        item-value="id"
        clearable
        return-object
        @update:search="onInput"
    />
</template>
