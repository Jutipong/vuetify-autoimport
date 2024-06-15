<script setup lang="ts">
import { useTheme } from 'vuetify'

const layoutStore = useLayoutStore()
const theme = useTheme()
const app = appSetting

theme.global.name.value = clientStorages.getTheme()

function toggleTheme() {
    theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
    clientStorages.setTheme(theme.global.name.value)
}

async function logOut(alertConfirm: boolean = true): Promise<void> {
    if (alertConfirm) {
        if (!await vConfirm.info('Logout!', `<div style="font-size: 60px; display: flex; justify-content: space-around; color:#FF4C51" class="mdi mdi-alert-circle-outline"></div>
             <h3>Are you sure you want to log out?</h3>`, {
            iconTitle: 'mdi-logout',
            btnOk: {
                color: 'error',
                text: 'Log out',
                icon: 'mdi-logout',
            },
            // btnCancelDisabled: true,
            // btnOkDisabled: true,
        })) {
            return
        }
    }

    router.replace('/login')
}

const iconTheme = computed(() => theme.global.name.value === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny')
const colorTheme = computed(() => theme.global.name.value === 'light' ? 'black' : 'white')
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
                <v-btn @click="toggleTheme">
                    <v-icon
                        :color="colorTheme"
                        :icon="iconTheme"
                    />
                </v-btn>

                <v-btn
                    color="error"
                    prepend-icon="mdi-logout"
                    @click="logOut()"
                >
                    Logout
                </v-btn>
            </template>
        </v-app-bar>
    </div>
</template>
