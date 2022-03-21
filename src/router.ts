import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Company from './views/Company.vue';
import Ranking from './views/Ranking.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/company',
    name: 'company',
    component: Company,
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
