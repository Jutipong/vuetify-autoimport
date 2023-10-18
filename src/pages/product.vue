<script lang="ts" setup>
const { getProducts, onClean, state } = useProductStore();
</script>

<template>
  <div>
    <product-action-modal v-model="state.data.activeModal" />

    <v-card>
      <v-card-title>
        <v-chip variant="outlined" color="primary" prepend-icon="mdi-magnify">
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
          @click="getProducts()">
        </v-btn>
        <v-btn
          color="warning"
          prepend-icon="mdi-refresh"
          text="Clear"
          @click="onClean()"></v-btn>
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
              @click="state.data.activeModal = true"></v-btn>
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
          :loading="state.data.loading"
          @update:options="getProducts">
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>
