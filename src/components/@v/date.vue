<script lang="ts" setup>
const value = defineModel<Date | null>()
</script>

<template>
    <VDateInput v-model="value" @click:clear="value = null" />
</template>
