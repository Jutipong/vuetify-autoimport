<script setup lang="ts">
const loading = ref(true);
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
<template>
  <v-app>
    <v-progress-linear :active="loading" indeterminate color="success" />
    <router-view />
  </v-app>
</template>
