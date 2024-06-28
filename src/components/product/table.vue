<script lang="ts" setup>
import type ProductModalComponent from './modal.vue'
import type { Header, Option, Table } from '@/types/common/table'
import type { ProductType } from '@/types/product'

const modalRef = ref<InstanceType<typeof ProductModalComponent> | null>(null)

const state = reactive({
    table: {
        headers: [
            { title: 'ID', key: 'id', align: 'center' },
            { title: 'Title', key: 'title' },
            { title: 'PRICE', key: 'price', align: 'end' },
            { title: 'RATING', key: 'rating', align: 'end' },
            { title: 'STOCK', key: 'stock', align: 'end' },
            { title: 'BRAND', key: 'brand', align: 'end' },
            { title: 'Actions', key: 'actions', sortable: false },
        ] as Header[],
        loading: false,
        options: tableOption,
        result: tableResult,
    } as Table<ProductType>,
    search: {} as ProductType,
})

const func = {
    onSearch: async (productSearch: ProductType) => {
        state.search = { ...productSearch }
        await func.getProducts()
    },
    getProducts: async (option?: Option) => {
        state.table.loading = true
        state.table.options = option || state.table.options

        const { products, total }
         = await api.get<{ products: ProductType[], total: number }>
         (`/products/search?q=${state.search.brand ?? ''}&limit=${state.table.options.itemsPerPage}&skip=${state.table.options.itemsPerPage * (state.table.options.page - 1)}`)

        state.table.result.datas = products
        state.table.result.total = total
        state.table.loading = false
    },
    onAdd: () => {
        modalRef.value?.open({} as ProductType)
    },
    onEdit: (product: ProductType) => {
        modalRef.value?.open(product)
    },
    onDelete: async (obj: ProductType) => {
        if (!await vConfirm.delete(`Confirm Delete`, `Delete '${obj.brand}'`))
            return

        vNotify.success(`delete ${obj.title} success`)
        vAlert.success('Successful', `delete ${obj.title} success`)
    },
}

defineExpose({
    onSearch: func.onSearch,
})
</script>

<template>
    <ProductModal ref="modalRef" />

    <VCard>
        <VCardTitle>
            <VRow>
                <VCol md="6">
                    <VChip color="success" prepend-icon="mdi-package-variant-closed" label>
                        Product
                    </VChip>
                </VCol>
                <VCol class="text-right" md="6">
                    <VBtn color="success" prepend-icon="mdi-plus" text="Add" @click="func.onAdd" />
                </VCol>
            </VRow>
        </VCardTitle>

        <VDivider />

        <VCardText>
            <VDataTableServer
                :headers="state.table.headers"
                :items-per-page="state.table.options.itemsPerPage"
                :items-length="state.table.result.total"
                :items="state.table.result.datas"
                :loading="state.table.loading"
                @update:options="func.getProducts"
            >
                <template #item.actions="{ item }">
                    <VIcon color="primary" class="me-2" @click="func.onEdit(item)">
                        mdi-pencil
                    </VIcon>
                    <VIcon color="error" @click="func.onDelete(item)">
                        mdi-delete
                    </VIcon>
                </template>

                <template #loading>
                    <v-skeleton-loader type="table-row@10" />
                </template>
            </VDataTableServer>
        </VCardText>
    </VCard>
</template>
