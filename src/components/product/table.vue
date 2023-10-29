<script setup lang="ts">
  import { ProductType, newProductType } from '@/types/product';

  const { GetProducts, state } = useProductStore();
  const activeModal = ref(false);
  const actionData = ref(newProductType());

  function onAction(obj: ProductType | null) {
    actionData.value = Object.assign({}, obj) ?? newProductType();
    activeModal.value = true;
  }

  function onDelete(obj: ProductType) {
    notify.error(`delete ${obj.title} success`);
  }
</script>

<template>
  <div>
    <ProductActionModal :product="actionData" v-model="activeModal" />
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol md="6">
            <VChip
              variant="outlined"
              color="success"
              prepend-icon="mdi-package-variant-closed"
              label
              >Product</VChip
            >
          </VCol>
          <VCol class="text-right" md="6">
            <VBtn
              color="success"
              prepend-icon="mdi-plus"
              text="Add"
              @click="onAction"></VBtn>
          </VCol>
        </VRow>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VDataTableServer
          :items-per-page="state.data.table.options.itemsPerPage"
          :headers="state.data.table.header"
          :items-length="state.data.table.result.total"
          :items="state.data.table.result.datas"
          :loading="state.data.table.loading"
          @update:options="GetProducts()">
          <template v-slot:item.actions="{ item }">
            <VIcon color="primary" class="me-2" @click="onAction(item)">
              mdi-pencil
            </VIcon>
            <VIcon color="error" @click="onDelete(item)"> mdi-delete </VIcon>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </div>
</template>
