<script setup lang="ts">
const route = useRoute('/user/[id]')
</script>

<template>
  <div>
    <h1>User Id: {{ route.params.id }}</h1>
  </div>
</template>
