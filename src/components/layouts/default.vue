<template>
  <v-app>
    <LayoutsHeader />
    <LayoutsNavigation />
    <v-main>
      <perfect-scrollbar>
        <v-container>
          <router-view />
        </v-container>
      </perfect-scrollbar>
    </v-main>
  </v-app>
</template>
