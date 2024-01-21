<script setup lang="ts">
const authStore = useAuthStore()
const layoutStore = useLayoutStore()
const { app } = useConstant
</script>

<template>
  <div>
    <!-- <v-system-bar> -->
    <!-- <v-progress-linear :active="true" indeterminate color="success" /> -->
    <!-- </v-system-bar> -->
    <v-app-bar
      color="primary"
      density="compact"
      scroll-behavior="inverted"
      scroll-threshold="1000"
    >
      <v-app-bar-nav-icon
        :icon="layoutStore.state.drawer ? 'mdi-menu-open' : 'mdi-menu-close'"
        variant="text"
        @click="layoutStore.toggleDrawer"
      />
      <v-app-bar-title>{{ app.name }} </v-app-bar-title>

      <template #append>
        <v-btn
          color="error"
          prepend-icon="mdi-logout"
          @click="authStore.logOut()"
        >
          Logout
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>
