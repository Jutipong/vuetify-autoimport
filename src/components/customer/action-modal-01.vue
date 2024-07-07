<script setup lang="ts">
// ถ้าใช้ props แบบนี้ ตอนเรียกใช้งานจะต้องใช้ v-bind ในการส่งค่า
// one-way binding ถ้าต้องการส่งค่ากลับให้ใช้ emit

interface PropsType {
    id?: number | null
    Name?: string
    Last?: string
    Address: string
    Details: [
        {
            id: string
            name: string
        },
    ]
}

const props = defineProps<PropsType>()
const emit = defineEmits<{ update: [value: Customer] }>()
const modalOpen = defineModel<boolean>()

const customer = ref<Customer>({} as Customer)

onMounted(() => {
// ใน props ค่าของ defindmodel จะถูกเก็บไว้ใน props ด้วย ดังนั้น ไม่ว่าจะค่า props หรือ defindmodel ก็สามารถใช้ watch ได้
    watch(modalOpen, (newVal) => {
        if (!newVal) {
            emit('update', customer.value)
            customer.value = {} as Customer
            return
        }

        Object.assign(customer, props)
    })
})

function closeModal() {
    modalOpen.value = false
}
</script>

<template>
    <Teleport to="body">
        <VRow justify="center">
            <VDialog v-model="modalOpen" persistent width="1024">
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
                        <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal" />
                    </VCardActions>
                </VCard>
            </VDialog>
        </VRow>
    </Teleport>
</template>
