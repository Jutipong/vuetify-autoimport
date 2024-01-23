<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<template>
  <!-- main components -->
  <router-view />

  <!-- util component -->
  <VConfirm />
  <v-overlay v-model="globalStore.loading" class="align-center justify-center" persistent>
    <v-card>
      <v-card-text class="text-center">
        <v-progress-circular size="32" color="green" indeterminate />
        <p class="mt-2">
          Loading...
        </p>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>
