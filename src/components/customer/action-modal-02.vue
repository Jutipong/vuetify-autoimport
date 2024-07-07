<script setup lang="ts">
// props two-way binding
const props = defineProps<{ customer: Customer, modalOpen: boolean }>()
const emit = defineEmits<{ onclose: [value: boolean, customer: Customer] }>()

const state = reactive({
    customer: {} as Customer,
    modalIsOpen: false,
})

onMounted(() => {
    watch(() => props.modalOpen, (newVal) => {
        state.modalIsOpen = newVal
    })
    watch(() => props.customer, (newValue) => {
        state.customer = newValue
    })
})

function closeModal() {
    emit('onclose', false, state.customer)
    state.modalIsOpen = false
    state.customer = {} as Customer
}
</script>

<template>
    <Teleport to="body">
        <VRow justify="center">
            <VDialog v-model="state.modalIsOpen" persistent width="1024">
                <VCard>
                    <VCardTitle>
                        <VChip color="success" prepend-icon="product.id ?">
                            Modal 02: {{ state.customer }}
                        </VChip>
                    </VCardTitle>

                    <VCardText mt2 mb2>
                        <VRow>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.customer.Name" label="Name" />
                            </VCol>
                            <VCol cols="12" md="4">
                                <VTextField v-model="state.customer.Last" label="Last" />
                            </VCol>
                            <VCol cols="12" md="4" />
                        </VRow>
                    </VCardText>

                    <VCardActions>
                        <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal()" />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
