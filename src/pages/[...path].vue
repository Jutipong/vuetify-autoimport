<script setup lang="ts">
function backPage() {
    const router = useRouter()
    router.back()
}
</script>

<template>
    <v-empty-state
        headline="Whoops, 404"
        title="Page not found"
        text="The page you were looking for does not exist"
        image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
    >
        <template #actions>
            <v-btn color="success mt-5 btn-lg" text="Back" @click="backPage" />
        </template>
    </v-empty-state>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
