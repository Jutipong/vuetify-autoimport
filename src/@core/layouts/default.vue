<template>
  <v-app>
    <LayoutsHeader />
    <LayoutsNavigation />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-label {
  color: rgb(var(--v-theme-primary));
  opacity: 1;
}
</style>
