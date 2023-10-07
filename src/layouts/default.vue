<template>
  <v-app>
    <LayoutHeader />
    <LayoutNavigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import LayoutHeader from '@/components/layouts/header.vue';
import LayoutNavigation from '@/components/layouts/navigation.vue';
</script>
