<script setup lang="ts">
import type { Header, Option, Table } from '@/types/common/table'
import type { ProductType } from '@/types/product'
import { newProductType } from '@/types/product'

const productStore = useProductStore()

// async function confirm() {
//   // await vConfirm.info('Confirm Update', 'Update data.')
//   // await vConfirm.warning('Confirm Delete', 'Delete data.')
//   // await vConfirm.save('Confirm Save', 'Save data.')
//   // await vConfirm.delete('Confirm Delete', 'Delete data.')
// }

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
})

const func = {
  getProducts: async (option: Option | null = null) => {
    state.table.loading = true
    state.table.options = option || state.table.options

    const res: any = await api.get(
      `/products/search?q=${state.search.name ?? ''}&limit=${state.table.options.itemsPerPage}`,
    )

    state.table.result.datas = res?.products ?? []
    state.table.result.total = res?.total ?? 10

    state.table.loading = false
  },
  onClear: async () => {
    Object.assign(state.search, {
      name: null,
      last: null,
      status: null,
    })
    await func.getProducts()
  },
  onAction: (obj: ProductType | null) => {
    Object.assign(state.modal.data, obj ?? newProductType())
    state.modal.active = true
  },
  onDelete: async (obj: ProductType) => {
    if (!await vConfirm.delete('Confirm Delete', 'Delete data.'))
      return

    vNotify.error(`delete ${obj.title} success`)
  },
}
</script>

<template>
  <div>
    <!-- modal actions -->
    <ProductActionModal v-model="state.modal.active" :product="state.modal.data" />

    <!-- search -->
    <VCard @keyup.enter="func.getProducts()">
      <VCardTitle>
        <VChip variant="outlined" color="primary" prepend-icon="mdi-magnify" label>
          Search
        </VChip>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VRow class="">
          <VCol cols="12" md="4">
            <VTextField v-model="state.search.name" label="First name" />
          </VCol>

          <VCol cols="12" md="4">
            <VTextField v-model="state.search.last" label="Last name" />
          </VCol>

          <VCol cols="12" md="4">
            <VSelect
              v-model="state.search.status" label="Status" :dirty="true"
              :items="productStore.state.master.status"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <VCardActions class="justify-end">
        <VBtn color="primary" prepend-icon="mdi-magnify" text="Search" @click="func.getProducts()" />
        <VBtn color="warning" prepend-icon="mdi-refresh" text="Clear" @click="func.onClear()" />
      </VCardActions>
    </VCard>

    <!-- table -->
    <VCard>
      <VCardTitle>
        <VRow>
          <VCol md="6">
            <VChip variant="outlined" color="success" prepend-icon="mdi-package-variant-closed" label>
              Product
            </VChip>
          </VCol>
          <VCol class="text-right" md="6">
            <VBtn color="success" prepend-icon="mdi-plus" text="Add" @click="func.onAction(null)" />
          </VCol>
        </VRow>
      </VCardTitle>
      <VDivider />
      <VCardText>
        <VDataTableServer
          :items-per-page="state.table.options.itemsPerPage" :headers="state.header"
          :items-length="state.table.result.total" :items="state.table.result.datas" :loading="state.table.loading"
          @update:options="func.getProducts()"
        >
          <template #item.actions="{ item }">
            <VIcon color="primary" class="me-2" @click="func.onAction(item)">
              mdi-pencil
            </VIcon>
            <VIcon color="error" @click="func.onDelete(item)">
              mdi-delete
            </VIcon>
          </template>
        </VDataTableServer>
      </VCardText>
    </VCard>

    <!-- <VDialogConfirm /> -->
  </div>
</template>
