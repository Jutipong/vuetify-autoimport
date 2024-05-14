<script setup lang="ts">
import type { CustomerType } from '@/types/customer'

const userData = reactive<CustomerType>({})
const modalIsActive = ref(false)

function openModal() {
  modalIsActive.value = true
}
</script>

<template>
  <div>
    <!-- modal actions -->
    <CustomerActionModal01 v-model="modalIsActive" v-bind="userData" />
    User: {{ userData }}
    <!-- search -->
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
            <VTextField v-model="userData.Name" label="Name" />
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="userData.Last" label="Last" />
          </VCol>
          <VCol cols="12" md="4" />
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions class="justify-end">
        <VBtn color="primary" text="Props+Emit-v-bin" @click="openModal" />
      </VCardActions>
    </VCard>
  </div>
</template>
