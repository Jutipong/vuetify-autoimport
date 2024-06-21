<script lang="ts" setup>
const value = defineModel<Date | null>()
</script>

<template>
    <VDateInput id="start" v-model="value" @click:clear="value = null" />
</template>
