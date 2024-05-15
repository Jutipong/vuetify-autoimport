<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
theme.global.name.value = clientStorages.getTheme()
</script>

<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
