<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useLayoutStore } from "@/store/layout";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon
      variant="text"
      @click="layoutStore.toggleDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>{{ layoutStore.title }} </v-app-bar-title>

    <template v-slot:append>
      <v-btn color="error" @click="authStore.logOut()">
        <Icon name="mdi-logout" />
        Logout
      </v-btn>
    </template>
  </v-app-bar>
</template>
