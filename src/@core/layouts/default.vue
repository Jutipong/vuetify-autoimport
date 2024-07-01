<script setup lang="ts">
const { mobile } = useDisplay()
const { isProgressLoading } = useAppStore()

const layoutCss = computed(() => {
    return {
        mini_nav: !mobile.value,
        full_nav: mobile.value,
    }
})
</script>

<template>
    <v-app :class="layoutCss">
        <v-progress-linear :active="isProgressLoading" style="z-index: 99999; position: fixed !important;" color="success" indeterminate />

        <Header />
        <Navigation />
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
