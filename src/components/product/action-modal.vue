<script setup lang="ts">
import type { ProductType } from '@/types/product'

const { product } = defineProps<{ product: ProductType }>()
const globalStore = useGlobalStore()
const active = defineModel<boolean>()

async function Create(product: ProductType) {
  globalStore.setLoading()

  await api.post(`/products/add`, product)

  globalStore.unLoading()
  notify.success('Product created successfully')

  return true
}

async function Update(product: ProductType) {
  globalStore.setLoading()

  await api.put(`/products/${product.id}`, {
    title: product.title,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
  })

  globalStore.unLoading()
  notify.success('Product updated successfully')

  return true
}

async function onSave() {
  const res = product.id ? await Update(product) : await Create(product)
  active.value = !res
}

function onClose() {
  active.value = false
}
</script>

<template>
  <Teleport to="body">
    <VRow justify="center">
      <VDialog
        v-model="active"
        persistent
        width="1024"
      >
        <VCard>
          <VCardTitle>
            <VChip
              variant="outlined"
              color="success"
              :prepend-icon="product.id ? 'mdi-pencil' : 'mdi-plus'"
            >
              {{ product.id ? 'Update' : 'Create' }} Product
            </VChip>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="product.title"
                  label="Title"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <VCurrency
                  v-model="product.price"
                  label="Price"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="product.rating"
                  label="Rating"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="product.stock"
                  label="Stock"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <VTextField
                  v-model="product.brand"
                  label="Brand"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              />
            </VRow>
          </VCardText>
          <VDivider />
          <VCardActions>
            <VSpacer />
            <VBtn
              color="primary"
              prepend-icon="mdi-content-save"
              text="Save"
              :loading="globalStore.loading"
              @click="onSave()"
            />
            <VBtn
              color="warning"
              text="Close"
              prepend-icon="mdi-close"
              @click="onClose()"
            />
          </VCardActions>
        </VCard>
      </VDialog>
    </VRow>
  </Teleport>
</template>
