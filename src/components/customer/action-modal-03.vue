<script setup lang="ts">
const props = defineProps<{ modalOpen: boolean }>()
const emit = defineEmits<{ onclose: [value: boolean] }>()

// props two-way binding by 'defineModel'
const customer = defineModel<Customer>({ required: true })

const modalIsOpen = ref<boolean>(false)

onMounted(() => {
    watch(() => props.modalOpen, (newVal) => {
        modalIsOpen.value = newVal
    })
})

function closeModal() {
    emit('onclose', false)
    modalIsOpen.value = false
}
</script>

<template>
    <Teleport to="body">
        <VRow justify="center">
            <VDialog v-model="modalIsOpen" persistent width="1024">
                <VCard>
                    <VCardTitle>
                        <VChip color="success" prepend-icon="product.id ?">
                            Modal 03: {{ customer }}
                        </VChip>
                    </VCardTitle>

                    <VCardText mt2 mb2>
                        <VRow>
                            <VCol cols="12" md="4">
                                <VTextField v-model="customer.Name" label="Name" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VTextField v-model="customer.Last" label="Last" />
                            </VCol>
                            <VCol cols="12" md="4" />
                        </VRow>
                    </VCardText>
                    <VDivider />
                    <VCardActions>
                        <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal()" />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
