<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const modalRef = useTemplateRef('modal')

const { isLoading } = storeToRefs(useAppStore())

const state = reactive({ search: {} as Product })

const { table, onSubmit, onPageChange, onSortByChange } = useDataTable<Product>([
    { title: 'ID', key: 'id', align: 'center' },
    { title: 'Title', key: 'title' },
    { title: 'PRICE', key: 'price', align: 'end' },
    { title: 'RATING', key: 'rating', align: 'end' },
    { title: 'STOCK', key: 'stock', align: 'end' },
    { title: 'BRAND', key: 'brand', align: 'end' },
    { title: 'Actions', key: 'actions', sortable: false },
], [{ key: 'id', order: 'asc' }], async () => {
    const { products, total } = await api.Get<{ products: Product[], total: number }>
    (`/products/search?q=${state.search.brand ?? ''}&limit=${table.options.itemsPerPage}&skip=${table.options.itemsPerPage * (table.options.page - 1)}`)

    table.result.items = products
    table.result.itemsLength = total
})

const func = {
    onAdd: () => {
        modalRef.value?.open({} as Product)
    },
    onEdit: (product: Product) => {
        modalRef.value?.open(product)
    },
    onDelete: async (obj: Product) => {
        if (!await _confirm.Delete(`Confirm Delete`, `Delete '${obj.brand}'`))
            return

        _notify.Success(`delete ${obj.title} success`)
        _alert.Success('Successful', `delete ${obj.title} success`)
    },
}

onMounted(() => onSubmit())

defineExpose({
    onSearch: async (productSearch: Product) => {
        state.search = { ...productSearch }
        onSubmit()
    },
})
</script>

<template>
    <ProductModal ref="modal" />

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
                :headers="table.headers"
                v-bind="{ ...table.options, ...table.result }"
                :loading="isLoading"
                @update:page="onPageChange"
                @update:sort-by="onSortByChange"
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
