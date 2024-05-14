<script setup lang="ts">
import type { CustomerType } from '@/types/customer'

// props two-way binding by 'defineModel'
const modalOpen = defineModel<boolean>()
// const customer = defineModel<CustomerType>()

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
              <!-- Modal 02: {{ customer }} -->
            </VChip>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol cols="12" md="4">
                <!-- <VTextField v-model="customer?.Name" label="Name" /> -->
              </VCol>
              <VCol cols="12" md="4">
                <!-- <VTextField v-model="customer?.Last" label="Last" /> -->
              </VCol>
              <VCol cols="12" md="4" />
            </VRow>
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="closeModal()" />
          </VCardActions>
        </VCard>
      </VDialog>
    </VRow>
  </Teleport>
</template>
