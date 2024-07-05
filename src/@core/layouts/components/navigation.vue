<script lang="ts" setup>
const layoutStore = useLayoutStore()
// const { mobile } = useDisplay()

// const device = computed(() => layoutStore.isMobile)
// watch(device, (val) => {
//     console.log(device.value)
//     if (val) {
//         // navState.rail = false;
//     }
// })

const open = ref(['Users'])
const cruds = [
    // { title: 'Home', icon: 'mdi-home', to: '/' },
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
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg" subtitle="abc@gmail.com">
                <!-- <template #append>
                    <div class="justify-self-end">
                        <v-btn
                            class="sm"
                            :ripple="false"
                            variant="plain"
                            rounded="lg"
                            :icon="layoutStore.state.isRail ? 'mdi-pin-off-outline' : 'mdi-pin-outline'"
                            @click="layoutStore.toggleRail()"
                        />
                    </div>
                </template> -->
            </v-list-item>
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
                <!-- <v-list-subheader>REPORTS</v-list-subheader> -->
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
    </v-navigation-drawer>
</template>

<!-- <style scoped>
.v-list-item--variant-plain {
    opacity: 1;
}
a.v-list-item--active {
    background: linear-gradient(
        72.47deg,
        #1976d2 22.16%,
        rgba(85, 132, 241, 0.7) 76.47%
    ) !important;
    box-shadow: 0 2px 6px #7367f07a;
    color: #fff !important;
}
</style> -->
