/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// import '@/scss/style.scss';

import App from './App.vue';

import vuetify from '@/plugins/vuetify';
import router from '@/plugins/router';

import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(PerfectScrollbar);
app.use(vuetify);
app.use(router);
app.use(createPinia());
app.mount('#app');
