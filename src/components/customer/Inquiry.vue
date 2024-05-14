<script setup lang="ts">
import type { CustomerType } from '@/types/customer'

const customer = reactive<CustomerType>({})

// =============== Modal 01 ===============
const modalOpen_01 = ref(false)
function openModal_01() {
  modalOpen_01.value = true
}
function updateCustomer(value: CustomerType) {
  Object.assign(customer, value)
}

// =============== Modal 02 ===============
const modalOpen_02 = ref(false)
function openModal_02() {
  modalOpen_02.value = true
}
function closeModal02(value: boolean) {
  modalOpen_02.value = value
}

// =============== Modal 03 ===============
const modalOpen_03 = ref(false)
function openModal_03() {
  modalOpen_03.value = true
}
function closeModal03(value: boolean) {
  modalOpen_03.value = value
}

const dateTh = () => _dateTh()
</script>

<template>
  <div>
    <!-- one way binding -->
    <CustomerActionModal01 v-bind="customer" v-model="modalOpen_01" @update="updateCustomer" />

    <!-- two way binding -->
    <!-- recommend: use 'defineProps' and 'defineEmits' for props and emit -->
    <CustomerActionModal02 :customer="customer" :modal-open="modalOpen_02" @onclose="closeModal02" />

    <!-- two way binding by 'defineModel' -->
    <CustomerActionModal03 v-model="customer" :modal-open="modalOpen_03" @onclose="closeModal03" />

    <VCard>
      <VCardTitle>
        <VChip color="primary" prepend-icon="mdi-magnify" label>
          {{ dateTh() }}
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
      </VCardText>
      <VDivider />
      <VCardActions class="justify-end">
        <VBtn color="primary" text="1.Props+Emit-v-bin" @click="openModal_01" />
        <VBtn color="primary" text="2.Props {} +Emit('close')" @click="openModal_02" />
        <VBtn color="primary" text="3.defineModel" @click="openModal_03" />
      </VCardActions>
    </VCard>
  </div>
</template>
