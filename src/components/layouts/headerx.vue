<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useLayoutStore } from '@/store/layout';

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon
      variant="text"
      @click="layoutStore.toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>{{ layoutStore.title }} </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        color="error"
        prepend-icon="mdi-logout"
        @click="authStore.logOut()">
        Logout
      </v-btn>
    </template>
  </v-app-bar>
</template>
