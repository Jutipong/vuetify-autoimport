<script setup lang="ts">
import type ProductTableComponent from './table.vue'

const tableRef = ref<InstanceType<typeof ProductTableComponent> | null>(null)

const state = reactive({
    master: {
        status: [
            { id: true, text: 'Active' },
            { id: false, text: 'InActive' },
        ],
    },
    search: {} as Product,
})

const func = {
    onClear: async () => {
        state.search = {} as Product
    },
    onSearch: async () => {
        await tableRef.value?.onSearch(state.search)
    },
}
</script>

<template>
    <VCard @keyup.enter="func.onSearch()">
        <VCardTitle>
            <VChip color="primary" prepend-icon="mdi-magnify" label>
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

            <VRow>
                <VCol cols="12" md="4">
                    <VCurrency v-model="state.search.discountPercentage" label="Discount" />
                </VCol>

                <VCol cols="12" md="4">
                    <VDate id="start" v-model="state.search.start" :max="state.search.end" label="Start Date" />
                </VCol>

                <VCol cols="12" md="4">
                    <VDate id="end" v-model="state.search.end" :min="state.search.start" label="End Date" />
                </VCol>
            </VRow>
        </VCardText>

        <VCardActions class="justify-end">
            <VBtn color="warning" prepend-icon="mdi-refresh" text="Clear" @click="func.onClear" />
            <VBtn color="primary" prepend-icon="mdi-magnify" text="Search" @click="func.onSearch" />
        </VCardActions>
    </VCard>

    <!-- table -->
    <ProductTable ref="tableRef" />
</template>
