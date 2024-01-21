<script lang="ts" setup>
const layoutStore = useLayoutStore()

const open = ref(['Users'])
const cruds = [
  { title: 'Demo1', icon: 'mdi-chevron-right', to: '/demo01' },
  { title: 'Demo2', icon: 'mdi-chevron-right', to: '/demo02' },
  { title: 'Product', icon: 'mdi-package', to: '/product' },
]

const cruds2 = [{ title: 'Demo03', icon: 'mdi-chevron-right', to: '/demo03' }]
</script>

<template>
  <v-navigation-drawer
    v-model="layoutStore.state.drawer"
    elevation="2"
    expand-on-hover
    :rail="!$vuetify.display.mobile && layoutStore.state.isRail"
  >
    <v-list density="compact">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg"
        title="ABC"
        subtitle="abc@gmail.com"
      >
        <template #append>
          <div class="justify-self-end">
            <v-btn
              rounded="xl"
              :icon="layoutStore.state.isRail ? 'mdi-pin-off-outline' : 'mdi-pin-outline'"
              @click="layoutStore.toggleRail()"
            />
          </div>
        </template>
      </v-list-item>
    </v-list>

    <v-divider />
    <v-list
      v-model:opened="open"
      color="primary"
      density="compact"
      variant="plain"
      nav
      :lines="false"
    >
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
            prepend-icon="mdi-test-tube"
            title="Menu 1"
          />
        </template>
        <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

        <v-list-item
          v-for="({ title, to }, i) in cruds"
          :key="i"
          :value="to"
          :to="to"
          :title="title"
        />
      </v-list-group>

      <v-list-group value="Users2">
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-test-tube"
            title="Menu 2"
          />
        </template>
        <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

        <v-list-item
          v-for="({ title, to }, i) in cruds2"
          :key="i"
          :value="to"
          :to="to"
          :title="title"
        />
      </v-list-group>
    </v-list>
    <!-- <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="red" @click="authStore.logOut()">
          <icon name="mdi:logout"></icon>
        </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>
