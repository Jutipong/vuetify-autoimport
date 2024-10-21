<script lang="ts" setup>
import { l } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'

const { mobile } = useDisplay()
const layoutStore = useLayoutStore()
const open = ref(['Users'])
const cruds = [
    { title: 'Product', icon: 'mdi-package', to: '/product' },
    { title: 'Validate [zod.dev]', icon: 'mdi-format-underline-wavy', to: '/validate' },
    { title: 'Customer[test]', icon: 'mdi-package', to: '/customer' },
]
const isExpand = ref(layoutStore.state.rail)

function getLogoImage(expandEvent: boolean) {
    if (!layoutStore.state.rail)
        return isExpand.value = false

    isExpand.value = expandEvent
}

onMounted(() => {
    watch(() => layoutStore.state.rail, (newValue) => {
        isExpand.value = newValue
    })

    watch(() => layoutStore.state.drawer, (newValue) => {
        if (!mobile.value)
            return

        isExpand.value = !newValue
    })
})
</script>

<template>
    <v-navigation-drawer
        v-model="layoutStore.state.drawer"
        class="layout_navigation"
        elevation="2"
        expand-on-hover
        :rail="layoutStore.state.rail"
        @update:rail="getLogoImage"
    >
        <PerfectScrollbar class="drawer-content">
            <v-list>
                <v-list-item v-if="isExpand" prepend-icon="mdi-dog" />
                <v-list-item v-else prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg" subtitle="abc@gmail.com" />
            </v-list>
            <v-divider />
            <v-list v-model:opened="open" color="primary" density="compact" nav>
                <v-list-item
                    prepend-icon="mdi-home"
                    title="Home"
                    value="/"
                    to="/"
                />
                <v-list-group value="Users">
                    <template #activator="{ props }">
                        <v-list-item
                            v-bind="props"
                            active-class="nav_active"
                            prepend-icon="mdi-test-tube" title="Menu 1"
                        />
                    </template>
                    <v-list-item
                        v-for="(row, index) in cruds" :key="index"
                        rounded="lg"
                        :title="row.title"
                        :prepend-icon="row.icon"
                        :value="row.to"
                        :to="row.to"
                    />
                </v-list-group>
            </v-list>
        </PerfectScrollbar>
    </v-navigation-drawer>
</template>

<style scoped>
.drawer-content {
    height: 100%;
    max-height: calc(100vh - 64px);
    overflow-y: auto;
}

.ps__rail-y {
    opacity: 0.6;
}
</style>
