<script setup lang="ts">
import { omit, pick, pickBy } from 'lodash'
import { StateTree } from 'pinia'
import type { ProductType } from '@/types/product'

const $g = useGlobalStore()

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
        if (!await vConfirm.save('Confirm Create', 'Create data.'))
            return

        $g.setLoading()
        await api.post(`/products/add`, state.product)

        $g.unLoading()
        vNotify.success('Product created successfully')
    },
    Update: async () => {
        if (!await vConfirm.save('Confirm Update', `Update brand ${state.product.brand}`))
            return

        const update = pick(state.product, ['id', 'title'])

        $g.setLoading()
        await api.put(`/products/${state.product.id}`, { update })

        $g.unLoading()
        vNotify.success('Product updated successfully')
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
                    <VDivider />
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
                            <VCol cols="12" md="4" />
                        </VRow>
                    </VCardText>
                    <VDivider />
                    <VCardActions>
                        <VSpacer />
                        <VBtn
                            color="warning"
                            prepend-icon="mdi-close"
                            text="Close"
                            @click="func.onClose()"
                        />
                        <VBtn
                            color="primary"
                            prepend-icon="mdi-content-save"
                            text="Save"
                            :loading="$g.isLoading"
                            @click="func.onAction()"
                        />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
