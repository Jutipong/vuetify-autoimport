<script setup lang="ts">
  import { Header, Option, Table } from '@/types/common/table';
  import { ProductType, SearchPropsType, newProductType } from '@/types/product';

  const header = [
    { title: 'ID', key: 'id', align: 'center' },
    { title: 'Title', key: 'title' },
    { title: 'PRICE', key: 'price', align: 'end' },
    { title: 'RATING', key: 'rating', align: 'end' },
    { title: 'STOCK', key: 'stock', align: 'end' },
    { title: 'BRAND', key: 'brand', align: 'end' },
    { title: 'Actions', key: 'actions', sortable: false },
  ] as Header[];

  const table = reactive<Table<null, ProductType>>({
    loading: false,
    options: {
      page: 1,
      itemsPerPage: useConstant.dataTable.pageSize,
      sortBy: [],
    },
    result: {
      datas: [],
      total: 0,
    },
  });

  const searchProps = reactive<SearchPropsType>({
    search: { name: null, last: null, status: null },
    GetProducts,
    onClear,
  });

  const activeModal = ref(false);
  const actionData = ref(newProductType());

  async function GetProducts(option: Option | null = null) {
    table.loading = true;
    table.options = option ? option : table.options;

    const res: any = await api.get(
      `/products/search?q=${searchProps.search.name ?? ''}&limit=${table.options.itemsPerPage}`
    );

    table.result.datas = res?.products ?? [];
    table.result.total = res?.total ?? 10;

    table.loading = false;
  }

  async function onClear() {
    searchProps.search = { name: null, last: null, status: null };
    await GetProducts();
  }

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

    <ProductSearch v-bind="searchProps" />

    <VCard>
      <VCardTitle>
        <VRow>
          <VCol md="6">
            <VChip variant="outlined" color="success" prepend-icon="mdi-package-variant-closed" label>Product</VChip>
          </VCol>
          <VCol class="text-right" md="6">
            <VBtn color="success" prepend-icon="mdi-plus" text="Add" @click="onAction"></VBtn>
          </VCol>
        </VRow>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VDataTableServer
          :items-per-page="table.options.itemsPerPage"
          :headers="header"
          :items-length="table.result.total"
          :items="table.result.datas"
          :loading="table.loading"
          @update:options="GetProducts()">
          <template v-slot:item.actions="{ item }">
            <VIcon color="primary" class="me-2" @click="onAction(item)"> mdi-pencil </VIcon>
            <VIcon color="error" @click="onDelete(item)"> mdi-delete </VIcon>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>
  </div>
</template>
