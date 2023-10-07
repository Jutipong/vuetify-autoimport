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
import LayoutHeader from "@/components/layout/Header.vue";
import LayoutNavigation from "@/components/layout/Navigation.vue";
</script>
