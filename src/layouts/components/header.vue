<script setup lang="ts">
const layoutStore = useLayoutStore()
const theme = useTheme()
const { mobile } = useDisplay()
const router = useRouter()
const appName = import.meta.env.VITE_APP_NAME

theme.global.name.value = layoutStore.state.theme

function toggleTheme() {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
    layoutStore.setTheme(theme.global.name.value)
}

async function logOut() {
    if (!await _confirm.Info('Logout!', '<div style="font-size: 60px; display: flex; justify-content: space-around; color:#FF4C51" '
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

const iconTheme = computed(() => theme.global.name.value === 'light' ? 'i-solar:sun-2-broken' : 'i-solar:moon-sleep-broken')
const colorTheme = computed(() => theme.global.name.value === 'light' ? 'white' : 'black')
const iconDrawer = computed(() => {
    if (!mobile.value) {
        return layoutStore.state.rail ? 'i-solar:round-double-alt-arrow-left-linear' : 'i-solar:round-double-alt-arrow-right-linear'
    }
    else {
        return layoutStore.state.drawer ? 'i-solar:round-double-alt-arrow-left-linear' : 'i-solar:round-double-alt-arrow-right-linear'
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
                class="animate-head-shake animate-duration-6s animate-count-infinite"
                :ripple="false"
                :icon="iconDrawer"
                variant="plain"
                @click="layoutStore.toggleDrawer()"
            />
            <v-app-bar-title>{{ appName }} </v-app-bar-title>

            <template #append>
                <v-btn :ripple="false" variant="plain" @click="toggleTheme">
                    <v-icon
                        class="animate-swing animate-duration-6s animate-count-infinite"
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
                    prepend-icon="i-solar:stretching-round-bold-duotone"
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
