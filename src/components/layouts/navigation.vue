<script lang="ts" setup>
const layoutStore = useLayoutStore();

const open = ref(['Users']);
const cruds = [
  ['Demo1', 'mdi-chevron-right', '/demo01'],
  ['Demo2', 'mdi-chevron-right', '/demo02'],
  ['Product', 'mdi-package', '/product'],
];
const cruds2 = [['Demo03', 'mdi-chevron-right', '/demo03']];
</script>

<template>
  <v-navigation-drawer
    elevation="2"
    expand-on-hover
    :rail="!$vuetify.display.mobile"
    v-model="layoutStore.drawer">
    <v-list density="compact">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg"
        title="ABC"
        subtitle="abc@gmail.com"></v-list-item>
    </v-list>

    <v-divider />

    <v-list
      color="primary"
      density="compact"
      variant="plain"
      nav
      :lines="false"
      v-model:opened="open">
      <v-list-item prepend-icon="mdi-home" title="Home" value="/" to="/"></v-list-item>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-test-tube" title="Menu 1"></v-list-item>
        </template>
        <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

        <v-list-item
          v-for="([title, icon, to], i) in cruds"
          :key="i"
          :value="to"
          :to="to"
          :title="title">
        </v-list-item>
      </v-list-group>

      <v-list-group value="Users2">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-test-tube" title="Menu 2"></v-list-item>
        </template>
        <!-- <v-list-subheader>REPORTS</v-list-subheader> -->

        <v-list-item
          v-for="([title, icon, to], i) in cruds2"
          :key="i"
          :value="to"
          :to="to"
          :title="title">
        </v-list-item>
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
