<script lang="ts" setup>
const value = defineModel<Date | null>()
</script>

<template>
    <VDateInput
        v-model="value"
        autocomplete="off"
        hide-details="auto"
        @click:clear="value = null"
    />
</template>
