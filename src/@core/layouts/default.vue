<script setup lang="ts">
const $g = useGlobalStore()
</script>

<template>
  <v-app>
    <v-progress-linear :active="$g.isLoading || $g.isLoadingPage" style="z-index: 99999; position: fixed !important;" color="success" indeterminate />
    <LayoutsHeader />
    <LayoutsNavigation />
    <v-main>
      <!-- <v-container> -->
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>

<style>
  .v-label {
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
