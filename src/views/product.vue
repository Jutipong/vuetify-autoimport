<script lang="ts" setup>
import { useProductStore } from "@/store/product";
import { Product } from "../types/product";
import { Header, Option } from "../types/v-table";
import { ref } from "vue";
const productStore = useProductStore();
const search = ref<string | undefined>();

const serverItems = ref<Product[]>([]);
const total = ref(0);
const perPage = ref(10);

const headers = ref<Header[]>([
  { title: "ID", key: "id", align: "center" },
  { title: "Title", key: "title" },
  { title: "PRICE", key: "price", align: "end" },
  { title: "RATING", key: "rating", align: "end" },
  { title: "STOCK", key: "stock", align: "end" },
  { title: "BRAND", key: "brand", align: "end" },
]);

async function loadItems(option: Option) {
  const result = await productStore.getProducts(option);

  serverItems.value = result.datas;
  total.value = result.total;
}
</script>

<template>
  <v-container>
    <v-card class="mb-2">
      <v-card-title>
        <v-chip color="info" prepend-icon="mdi-magnify" label> Search </v-chip>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="">
          <v-col cols="12" md="4">
            <v-text-field label="First name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="Last name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="E-mail"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn color="warning" prepend-icon="mdi-refresh" text="Clear"></v-btn>
        <v-btn color="primary" prepend-icon="mdi-magnify" text="Search">
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-text>
        <v-row class="mb-1">
          <v-col md="6">
            <v-chip
              color="success"
              prepend-icon="mdi-package-variant-closed"
              label
              >Product</v-chip
            >
          </v-col>
          <v-col class="text-right" md="6">
            <v-btn color="success" prepend-icon="mdi-plus" text="Search">
            </v-btn>
          </v-col>
        </v-row>
        <v-data-table-server
          :headers="headers"
          :items-length="total"
          :items="serverItems"
          :loading="productStore.state.loading"
          @update:options="loadItems"
        >
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </v-container>
</template>
