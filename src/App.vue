<script setup lang="ts">
  const globalStore = useGlobalStore()
</script>

<template>
  <router-view />
  <v-overlay
    v-model="globalStore.loading"
    class="align-center justify-center"
    persistent>
    <v-card>
      <v-card-text class="text-center">
        <v-progress-circular
          size="32"
          color="green"
          indeterminate></v-progress-circular>
        <p class="mt-2">Loading...</p>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>
