<script setup lang="ts">
import { Product } from '@/types/product';

const globalStore = useGlobalStore();
const { Create, Update } = useProductStore();

const active = defineModel<boolean>();
const { product } = defineProps<{ product: Product }>();

async function onSave() {
  const res = product.id ? await Update(product) : await Create(product);
  active.value = !res;
}

function onClose() {
  active.value = false;
}
</script>

<template>
  <Teleport to="body">
    <VRow justify="center">
      <VDialog v-model="active" persistent width="1024">
        <VCard>
          <VCardTitle>
            <VChip
              variant="outlined"
              color="success"
              :prepend-icon="product.id ? 'mdi-pencil' : 'mdi-plus'">
              {{ product.id ? 'Update' : 'Create' }} Product
            </VChip>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol cols="12" md="4">
                <VTextField label="Title" v-model="product.title"></VTextField>
              </VCol>
              <VCol cols="12" md="4">
                <VTextField label="Price" v-model="product.price"></VTextField>
              </VCol>
              <VCol cols="12" md="4">
                <VTextField label="Rating" v-model="product.rating"></VTextField>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="12" md="4">
                <VTextField label="Stock" v-model="product.stock"></VTextField>
              </VCol>
              <VCol cols="12" md="4">
                <VTextField label="Brand" v-model="product.brand"></VTextField>
              </VCol>
              <VCol cols="12" md="4"> </VCol>
            </VRow>
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn
              color="primary"
              prepend-icon="mdi-content-save"
              text="Save"
              :loading="globalStore.loading"
              @click="onSave()"></VBtn>
            <VBtn
              color="warning"
              text="Close"
              prepend-icon="mdi-close"
              @click="onClose()"></VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VRow>
  </Teleport>
</template>
