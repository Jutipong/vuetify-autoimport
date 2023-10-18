<script lang="ts" setup>
import { Product, newProductType } from '@/types/product';

const { GetProducts, Clear, state } = useProductStore();

const activeModal = ref(false);
const actionData = ref(newProductType());

function onAction(obj: Product | null) {
  actionData.value = Object.assign({}, obj) ?? newProductType();
  activeModal.value = true;
}

function onDelete(obj: Product) {
  notify.error(`delete ${obj.title} success`);
}
</script>

<template>
  <div>
    <product-action-modal :product="actionData" v-model="activeModal" />
    <v-card>
      <v-card-title>
        <v-chip variant="outlined" color="primary" prepend-icon="mdi-magnify" label>
          Search
        </v-chip>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row class="">
          <v-col cols="12" md="4">
            <v-text-field
              label="First name"
              v-model="state.data.table.search"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="Last name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              label="Status"
              :dirty="true"
              :items="state.master.status"
              v-model="state.data.status"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          text="Search"
          @click="GetProducts()">
        </v-btn>
        <v-btn
          color="warning"
          prepend-icon="mdi-refresh"
          text="Clear"
          @click="Clear()"></v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>
        <v-row>
          <v-col md="6">
            <v-chip
              variant="outlined"
              color="success"
              prepend-icon="mdi-package-variant-closed"
              label
              >Product</v-chip
            >
          </v-col>
          <v-col class="text-right" md="6">
            <v-btn
              color="success"
              prepend-icon="mdi-plus"
              text="Add"
              @click="onAction"></v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table-server
          :items-per-page="state.data.table.options.itemsPerPage"
          :headers="state.data.table.header"
          :items-length="state.data.table.result.total"
          :items="state.data.table.result.datas"
          :loading="state.data.table.loading"
          @update:options="GetProducts()">
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" class="me-2" @click="onAction(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="error" @click="onDelete(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>
