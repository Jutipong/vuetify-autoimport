<script lang="ts" setup>
const { getProducts, onClean } = useProductStore();
const { state } = toRefs(useProductStore());
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
            <v-text-field label="First name" v-model="state.table.search"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="Last name"></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              label="Status"
              :dirty="true"
              :items="state.status.options"
              v-model="state.status.value"></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions class="justify-end">
        <v-btn color="warning" prepend-icon="mdi-refresh" text="Clear" @click="onClean()"></v-btn>
        <v-btn color="primary" prepend-icon="mdi-magnify" text="Search" @click="getProducts()">
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
          :items-per-page="state.table.options.itemsPerPage"
          :headers="state.table.header"
          :items-length="state.table.result.total"
          :items="state.table.result.datas"
          :loading="state.loading"
          @update:options="getProducts">
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>
