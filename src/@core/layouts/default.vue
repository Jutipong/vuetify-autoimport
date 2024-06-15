<script setup lang="ts">
import LayoutsHeader from './components/header.vue'
import LayoutsNavigation from './components/navigation.vue'

const $g = useGlobalStore()
</script>

<template>
    <VApp>
        <VProgressLinear :active="$g.isLoading || $g.isLoadingPage" style="z-index: 99999; position: fixed !important;" color="success" indeterminate />
        <LayoutsHeader />
        <LayoutsNavigation />
        <VMain>
            <!-- <v-container> -->
            <RouterView v-slot="{ Component }">
                <Transition
                    name="fade"
                    mode="out-in"
                >
                    <!-- <KeepAlive :name="Component"> -->
                    <component :is="Component" />
                    <!-- </KeepAlive> -->
                </Transition>
            </RouterView>
            <!-- </v-container> -->
        </VMain>
    </VApp>
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
