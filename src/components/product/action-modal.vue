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
  <teleport to="body">
    <v-row justify="center">
      <v-dialog v-model="active" persistent width="1024">
        <v-card>
          <v-card-title>
            <v-chip
              variant="outlined"
              color="success"
              :prepend-icon="product.id ? 'mdi-pencil' : 'mdi-plus'">
              {{ product.id ? 'Update' : 'Create' }} Product
            </v-chip>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Title" v-model="product.title"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Price" v-model="product.price"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Rating" v-model="product.rating"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field label="Stock" v-model="product.stock"></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field label="Brand" v-model="product.brand"></v-text-field>
              </v-col>
              <v-col cols="12" md="4"> </v-col>
            </v-row>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              prepend-icon="mdi-content-save"
              text="Save"
              :loading="globalStore.loading"
              @click="onSave()"></v-btn>
            <v-btn
              color="warning"
              text="Close"
              prepend-icon="mdi-close"
              @click="onClose()"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </teleport>
</template>
