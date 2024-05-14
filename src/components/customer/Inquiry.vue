<script setup lang="ts">
import { b } from 'node_modules/unplugin-vue-router/dist/options-yBvUhD_i.mjs'
import type { CustomerType } from '@/types/customer'

const customer = reactive<CustomerType>({})
const modalOpen_01 = ref(false)
const modalOpen_02 = ref(false)
const modalOpen_03 = ref(false)

// Modal 01
function openModal_01() {
  modalOpen_01.value = true
}

function updateCustomer(value: CustomerType) {
  Object.assign(customer, value)
}

// Modal 02
function openModal_02() {
  modalOpen_02.value = true
}
function closeModal02(value: boolean) {
  modalOpen_02.value = value
}

// Modal 03
function openModal_03() {
  modalOpen_03.value = true
}
</script>

<template>
  <div>
    <!-- one way binding -->
    <CustomerActionModal01 v-bind="customer" v-model="modalOpen_01" @update="updateCustomer" />

    <!-- two way binding -->
    <CustomerActionModal02 :customer="customer" :modal-open="modalOpen_02" @onclose="closeModal02" />

    <!-- two way binding by 'defineModel' -->
    <CustomerActionModal03 v-model="customer" :modal-open="modalOpen_03" @onclose="(val) => modalOpen_03 = val" />

    <VCard>
      <VCardTitle>
        <VChip color="primary" prepend-icon="mdi-magnify" label>
          Search
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
        <VBtn color="primary" text="Props+Emit-v-bin" @click="openModal_01" />
        <VBtn color="primary" text="Props {} +Emit('close')" @click="openModal_02" />
        <VBtn color="primary" text="defineModel" @click="openModal_03" />
      </VCardActions>
    </VCard>
  </div>
</template>
