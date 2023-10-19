<script setup lang="ts">
const { GetProducts, Clear, state } = useProductStore();
</script>

<template>
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
</template>

<style lang="scss" scoped></style>
