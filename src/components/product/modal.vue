<script setup lang="ts">
import type { ApiResponse } from '@/types/common/api-response'
import type { ProductType } from '@/types/product'

const appStore = useAppStore()

const state = reactive({
    product: {} as ProductType,
    active: false,
})

const title = computed(() => state.product.id ? 'Update' : 'Create')
const titleIcon = computed(() => state.product.id ? 'mdi-pencil' : 'mdi-plus')

const func = {
    onAction: async () => {
        state.product.id ? await func.Update() : await func.Create()
    },
    Create: async () => {
        appStore.setLoading()
        const { error } = await api.post<ApiResponse>(`/products/add`, state.product)

        if (error)
            return

        appStore.unLoading()
        vNotify.success('Product created successfully')

        state.active = false
    },
    Update: async () => {
        if (!await vConfirm.save('Confirm Update', `Update brand ${state.product.brand}`))
            return

        const update = _.pick(state.product, ['id', 'title'])

        appStore.setLoading()
        const { error } = await api.put<ApiResponse>(`/products/${state.product.id}`, { update })

        if (error)
            return

        appStore.unLoading()
        vNotify.success('Product updated successfully')

        state.active = false
    },
    onOpen: (product: ProductType) => {
        state.product = { ...product }
        state.active = true
    },
    onClose: () => {
        state.active = false
        state.product = {} as ProductType
    },
}

defineExpose({
    open: func.onOpen,
    close: func.onClose,
})
</script>

<template>
    <Teleport to="body">
        <VRow justify="center">
            <VDialog v-model="state.active" persistent width="1024">
                <VCard>
                    <VCardTitle>
                        <VChip color="success" :prepend-icon="titleIcon">
                            {{ title }} Product
                        </VChip>
                    </VCardTitle>

                    <VCardText>
                        <VRow>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.product.title" label="Title" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VCurrency v-model="state.product.price" label="Price" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.product.rating" label="Rating" />
                            </VCol>
                        </VRow>
                        <VRow>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.product.stock" label="Stock" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.product.brand" label="Brand" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VNumberInput
                                    v-model="state.product.discountPercentage"
                                    density="compact"
                                    color="primary"
                                    variant="outlined" label="Discount"
                                />
                            </VCol>
                        </VRow>
                    </VCardText>

                    <VCardActions>
                        <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="func.onClose()" />
                        <VBtn color="primary" prepend-icon="mdi-content-save" text="Save" :loading="appStore.isLoading" @click="func.onAction()" />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
