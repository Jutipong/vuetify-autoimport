<script setup lang="ts">
// props two-way binding
const props = defineProps<{ customer: CustomerType, modalOpen: boolean }>()

const emit = defineEmits<{ onclose: [value: boolean, customer: CustomerType] }>()

const modalIsOpen = ref<boolean>(false)
const customer = ref({} as CustomerType)

onMounted(() => {
    watch(() => props.modalOpen, (newVal) => {
        modalIsOpen.value = newVal
    })
    watch(() => props.customer, (newValue) => {
        customer.value = newValue
    })
})

function closeModal() {
    emit('onclose', false, customer.value)
    modalIsOpen.value = false
    customer.value = {} as CustomerType
}
</script>

<template>
    <Teleport to="body">
        <VRow justify="center">
            <VDialog v-model="modalIsOpen" persistent width="1024">
                <VCard>
                    <VCardTitle>
                        <VChip color="success" prepend-icon="product.id ?">
                            Modal 02: {{ customer }}
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

                    <VCardActions>
                        <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal()" />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
