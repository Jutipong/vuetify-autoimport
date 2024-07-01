<script setup lang="ts">
const layoutStore = useLayoutStore()
const theme = useTheme()
const { mobile } = useDisplay()
const appName = import.meta.env.VITE_APP_NAME

theme.global.name.value = layoutStore.state.theme

function toggleTheme() {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
    layoutStore.setTheme(theme.global.name.value)
}

async function logOut() {
    if (!await vConfirm.info('Logout!', '<div style="font-size: 60px; display: flex; justify-content: space-around; color:#FF4C51" '
        + 'class="mdi mdi-logout animate-tada animate-count-infinite animate-duration-3s">'
        + '</div> <h3>Are you sure you want to log out?</h3>', {
        iconTitle: false,
        btnOk: {
            color: 'error',
            text: 'Yes',
            icon: 'mdi-logout',
        },
        btnCancel: {
            color: 'secondary',
            text: 'No',
            icon: 'mdi-close',
        },
    })) {
        return
    }

    router.replace('/login')
}

const iconTheme = computed(() => theme.global.name.value === 'light' ? 'mdi-white-balance-sunny' : 'mdi-weather-night')
const colorTheme = computed(() => theme.global.name.value === 'light' ? 'white' : 'black')
const iconDrawer = computed(() => {
    if (!mobile.value) {
        return layoutStore.state.rail ? 'mdi-menu-close' : 'mdi-menu-open'
    }
    else {
        return layoutStore.state.drawer ? 'mdi-menu-open' : 'mdi-menu-close'
    }
})
</script>

<template>
    <div>
        <!-- <v-system-bar> -->
        <!-- <v-progress-linear :active="true" indeterminate color="success" /> -->
        <!-- </v-system-bar> -->
        <v-app-bar
            elevation="0"
            class="app-header"
            color="primary"
            density="compact"
            scroll-behavior="elevate"
        >
            <v-app-bar-nav-icon
                class="animate-head-shake animate-count-infinite animate-duration-6s"
                :ripple="false"
                :icon="iconDrawer"
                variant="plain"
                @click="layoutStore.toggleDrawer()"
            />
            <v-app-bar-title>{{ appName }} </v-app-bar-title>

            <template #append>
                <v-btn :ripple="false" variant="plain" @click="toggleTheme">
                    <v-icon
                        class="animate-swing animate-count-infinite animate-duration-6s"
                        :color="colorTheme"
                        :icon="iconTheme"
                    />
                </v-btn>

                <v-btn
                    font-semibold
                    class="color-red-600"
                    hover="animate-head-shake animate-count-infinite animate-duration-4s"
                    :ripple="false"
                    variant="plain"
                    prepend-icon="mdi-logout"
                    @click="logOut()"
                >
                    Logout
                </v-btn>
            </template>
        </v-app-bar>
    </div>
</template>

<style scoped>
.v-btn--variant-plain {
    opacity: 1;
}
</style>
