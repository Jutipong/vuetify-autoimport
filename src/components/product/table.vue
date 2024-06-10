<script lang="ts" setup>
import type ProductModal from './modal.vue'
import type { Header, Option, Table } from '@/types/common/table'
import type { ProductType } from '@/types/product'

const modalRef = ref<InstanceType<typeof ProductModal> | null>(null)

const header = ref<Header[]>([
    { title: 'ID', key: 'id', align: 'center' },
    { title: 'Title', key: 'title' },
    { title: 'PRICE', key: 'price', align: 'end' },
    { title: 'RATING', key: 'rating', align: 'end' },
    { title: 'STOCK', key: 'stock', align: 'end' },
    { title: 'BRAND', key: 'brand', align: 'end' },
    { title: 'Actions', key: 'actions', sortable: false },
])

const state = reactive({
    table: {
        loading: false,
        options: {
            page: 1,
            itemsPerPage: _const.dataTable.pageSize,
            sortBy: [],
        },
        result: {
            datas: [],
            total: 0,
        },
    } as Table<ProductType>,
    search: {} as ProductType,
})

const func = {
    onSearch: async (product: ProductType) => {
        console.log(product)
    },
    getProducts: async (option: Option | null = null) => {
        state.table.loading = true
        state.table.options = option || state.table.options

        const { products, total }
         = await api.get<{ products: ProductType[], total: number }>(`/products/search?q=${state.search.brand ?? ''}&limit=${state.table.options.itemsPerPage}`)

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
    },
}

defineExpose({ onSearch: func.onSearch })
</script>

<template>
    <!-- modal actions -->
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
                :headers="header"
                :items-per-page="state.table.options.itemsPerPage"
                :items-length="state.table.result.total"
                :items="state.table.result.datas"
                :loading="state.table.loading"
                @update:options="func.getProducts()"
            >
                <template #item.actions="{ item }">
                    <VIcon color="primary" class="me-2" @click="func.onEdit(item)">
                        mdi-pencil
                    </VIcon>
                    <VIcon color="error" @click="func.onDelete(item)">
                        mdi-delete
                    </VIcon>
                </template>
            </VDataTableServer>
        </VCardText>
    </VCard>
</template>
