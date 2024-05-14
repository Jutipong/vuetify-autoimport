<script setup lang="ts">
import type { CustomerType } from '@/types/customer'

// ถ้าใช้ props แบบนี้ ตอนเรียกใช้งานจะต้องใช้ v-bind ในการส่งค่า
// one-way binding ถ้าต้องการส่งค่ากลับให้ใช้ emit
const props = defineProps<CustomerType>()
const emit = defineEmits<{ update: [value: CustomerType] }>()
const modalOpen = defineModel<boolean>()

const customer = ref<CustomerType>({})

onMounted(() => {
// ใน props ค่าของ defindmodel จะถูกเก็บไว้ใน props ด้วย ดังนั้น ไม่ว่าจะค่า props หรือ defindmodel ก็สามารถใช้ watch ได้
  watch(props, (newVal) => {
    if (!modalOpen.value) {
      emit('update', customer.value)
      customer.value = {}
      return
    }

    Object.assign(customer, newVal)
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
          <VDivider />
          <VCardText>
            <VRow>
              <VCol cols="12" md="4">
                <VTextField v-model="customer.Name" label="Name" />
              </VCol>
              <VCol cols="12" md="4">
                <VTextField v-model="customer.Last" label="Last" />
              </VCol>
              <VCol cols="12" md="4" />
            </VRow>
            <VRow>
              <VCol cols="12" md="4">
                <!-- <VTextField v-model="product.stock" label="Stock" /> -->
              </VCol>
              <VCol cols="12" md="4">
                <!-- <VTextField v-model="product.brand" label="Brand" /> -->
              </VCol>
              <VCol cols="12" md="4" />
            </VRow>
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal" />
          </VCardActions>
        </VCard>
      </VDialog>
    </VRow>
  </Teleport>
</template>
