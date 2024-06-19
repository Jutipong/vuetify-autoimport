<script setup lang="ts">
import type ProductTableComponent from './table.vue'
import type { ProductType } from '@/types/product'

const tableRef = ref<InstanceType<typeof ProductTableComponent> | null>(null)

const state = reactive({
    master: {
        status: [
            { id: true, text: 'Active' },
            { id: false, text: 'InActive' },
        ],
    },
    search: {} as ProductType,
})

const func = {
    onClear: async () => {
        state.search = {} as ProductType
    },
    onSearch: async () => {
        console.log('search from search-form.vue')
        await tableRef.value?.onSearch(state.search)
    },
}
</script>

<template>
    <VCard @keyup.enter="func.onSearch()">
        <VCardTitle mb-1>
            <VChip color="primary" prepend-icon="mdi-magnify" label size="large" rounded="lg" pa2>
                Filter
            </VChip>
        </VCardTitle>

        <VCardText>
            <VRow>
                <VCol cols="12" md="4">
                    <VTextField v-model="state.search.brand" label="Brand" />
                </VCol>

                <VCol cols="12" md="4">
                    <VTextField v-model="state.search.title" label="Title" />
                </VCol>

                <VCol cols="12" md="4">
                    <VSelect
                        v-model="state.search.status"
                        :dirty="true"
                        :items="state.master.status" label="Status"
                    />
                </VCol>
            </VRow>
        </VCardText>

        <VCardActions class="justify-end">
            <VBtn prepend-icon="mdi-refresh" text="Clear" @click="func.onClear" />
            <VBtn color="primary" prepend-icon="mdi-magnify" text="Search" @click="func.onSearch" />
        </VCardActions>
    </VCard>

    <!-- table -->
    <ProductTable ref="tableRef" />
</template>
