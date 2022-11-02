import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import HomePage from '~/views/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
