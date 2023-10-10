<script lang="ts" setup>
const productStore = useProductStore();
</script>

<template>
  <div>
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
              v-model="productStore.state.table.search"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="Last name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="E-mail"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn
          color="warning"
          prepend-icon="mdi-refresh"
          text="Clear"
          @click="productStore.onClean()"></v-btn>
        <v-btn
          color="primary"
          prepend-icon="mdi-magnify"
          text="Search"
          @click="productStore.getProducts()">
        </v-btn>
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
            <v-btn color="success" prepend-icon="mdi-plus" text="Add"> </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-data-table-server
          v-model:items-per-page="productStore.state.table.options.itemsPerPage"
          :headers="productStore.state.table.header"
          :items-length="productStore.state.table.result.total ?? 10"
          :items="productStore.state.table.result.datas"
          :loading="productStore.state.loading"
          @update:options="productStore.getProducts">
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>
