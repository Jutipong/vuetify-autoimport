/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// import '@/scss/style.scss';

import App from './App.vue';

import vuetify from '@/@core/plugins/vuetify';
import router from '@/@core/plugins/router';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(createPinia());
app.mount('#app');
