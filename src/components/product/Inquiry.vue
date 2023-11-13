<script setup lang="ts">
  import { Header, Option, Table } from '@/types/common/table';
  import { ProductType, newProductType } from '@/types/product';
  const productStore = useProductStore();

  const state = reactive({
    header: [
      { title: 'ID', key: 'id', align: 'center' },
      { title: 'Title', key: 'title' },
      { title: 'PRICE', key: 'price', align: 'end' },
      { title: 'RATING', key: 'rating', align: 'end' },
      { title: 'STOCK', key: 'stock', align: 'end' },
      { title: 'BRAND', key: 'brand', align: 'end' },
      { title: 'Actions', key: 'actions', sortable: false },
    ] as Header[],
    table: {
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
    } as Table<ProductType>,
    search: {
      name: null,
      last: null,
      status: null,
    },
    modal: {
      active: false,
      data: newProductType(),
    },
  });

  async function GetProducts(option: Option | null = null) {
    state.table.loading = true;
    state.table.options = option ? option : state.table.options;

    const res: any = await api.get(
      `/products/search?q=${state.search.name ?? ''}&limit=${state.table.options.itemsPerPage}`
    );

    state.table.result.datas = res?.products ?? [];
    state.table.result.total = res?.total ?? 10;

    state.table.loading = false;
  }

  async function onClear() {
    Object.assign(state.search, {
      name: null,
      last: null,
      status: null,
    });
    await GetProducts();
  }

  function onAction(obj: ProductType | null) {
    Object.assign(state.modal.data, obj ?? newProductType());
    state.modal.active = true;
  }

  function onDelete(obj: ProductType) {
    notify.error(`delete ${obj.title} success`);
  }
</script>

<template>
  <div>
    <!-- modal actions -->
    <ProductActionModal :product="state.modal.data" v-model="state.modal.active" />

    <!-- search -->
    <VCard @keyup.enter="GetProducts()">
      <VCardTitle>
        <VChip variant="outlined" color="primary" prepend-icon="mdi-magnify" label> Search </VChip>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VRow class="">
          <VCol cols="12" md="4">
            <VTextField label="First name" v-model="state.search.name"></VTextField>
          </VCol>

          <VCol cols="12" md="4">
            <VTextField label="Last name" v-model="state.search.last"></VTextField>
          </VCol>

          <VCol cols="12" md="4">
            <VSelect
              label="Status"
              :dirty="true"
              :items="productStore.state.master.status"
              v-model="state.search.status"></VSelect>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions class="justify-end">
        <VBtn color="primary" prepend-icon="mdi-magnify" text="Search" @click="GetProducts()"> </VBtn>
        <VBtn color="warning" prepend-icon="mdi-refresh" text="Clear" @click="onClear()"></VBtn>
      </VCardActions>
    </VCard>

    <!-- table -->
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol md="6">
            <VChip variant="outlined" color="success" prepend-icon="mdi-package-variant-closed" label>Product</VChip>
          </VCol>
          <VCol class="text-right" md="6">
            <VBtn color="success" prepend-icon="mdi-plus" text="Add" @click="onAction(null)"></VBtn>
          </VCol>
        </VRow>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VDataTableServer
          :items-per-page="state.table.options.itemsPerPage"
          :headers="state.header"
          :items-length="state.table.result.total"
          :items="state.table.result.datas"
          :loading="state.table.loading"
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
