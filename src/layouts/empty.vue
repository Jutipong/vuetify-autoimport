<script setup lang="ts">
const theme = useTheme()
const { state } = useLayoutStore()
theme.global.name.value = state.theme
</script>

<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>
