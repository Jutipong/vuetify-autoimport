<script lang="ts" setup>
const layoutStore = useLayoutStore()
const open = ref(['Users'])
const cruds = [
    { title: 'Product', icon: 'mdi-package', to: '/product' },
    { title: 'Validate [zod.dev]', icon: 'mdi-format-underline-wavy', to: '/validate' },
    { title: 'Customer[test]', icon: 'mdi-package', to: '/customer' },
]
</script>

<template>
    <v-navigation-drawer
        v-model="layoutStore.state.drawer"
        class="layout_navigation"
        elevation="2"
        expand-on-hover
        :rail="layoutStore.state.rail"
    >
        <PerfectScrollbar class="drawer-content">
            <v-list>
                <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg" subtitle="abc@gmail.com" />
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
