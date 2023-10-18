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

import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(createPinia());
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  timeout: 5000,
  maxToasts: 9,
  newestOnTop: true,
} as PluginOptions);
app.mount('#app');
