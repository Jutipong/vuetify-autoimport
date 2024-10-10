<script setup lang="ts">
const router = useRoute('/user/[id]')
const userId = router.params.id
</script>

<template>
    <div>
        <h1>User Id: {{ userId }}</h1>
    </div>
</template>
