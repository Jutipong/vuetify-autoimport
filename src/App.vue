<script setup lang="ts">
const { isLoading } = storeToRefs(useAppStore())
</script>

<template>
    <!-- main components -->
    <router-view />

    <!-- util component -->
    <VConfirm />
    <VValert />

    <v-overlay v-model="isLoading" class="align-center justify-center" persistent>
        <v-card>
            <v-card-text class="text-center">
                <v-progress-circular size="32" color="success" indeterminate />
                <p class="mt-2">
                    Loading....
                </p>
            </v-card-text>
        </v-card>
    </v-overlay>
</template>
