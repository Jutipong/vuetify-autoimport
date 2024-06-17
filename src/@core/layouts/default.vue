<script setup lang="ts">
import LayoutsHeader from './components/header.vue'
import LayoutsNavigation from './components/navigation.vue'

const $g = useGlobalStore()
</script>

<template>
    <v-app>
        <v-progress-linear :active="$g.isLoading || $g.isLoadingPage" style="z-index: 99999; position: fixed !important;" color="success" indeterminate />
        <v-layout
            :class="{
                mini_nav: !$vuetify.display.mobile,
                full_nav: $vuetify.display.mobile,
            }"
        >
            <LayoutsNavigation />
            <LayoutsHeader />
            <v-main>
                <!-- <v-container> -->
                <router-view v-slot="{ Component }">
                    <transition
                        name="fade"
                        mode="out-in"
                    >
                        <!-- <KeepAlive :name="Component"> -->
                        <component :is="Component" />
                    <!-- </KeepAlive> -->
                    </transition>
                </router-view>
            <!-- </v-container> -->
            </v-main>
        </v-layout>
    </v-app>
</template>

<style>
  .v-label {
    color: rgb(var(--v-theme-primary));
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
