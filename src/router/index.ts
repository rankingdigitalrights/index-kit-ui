import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Company from "@/views/Company.vue";
import Ranking from "@/views/Ranking.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/company",
    name: "company",
    component: Company,
  },
  {
    path: "/ranking",
    name: "ranking",
    component: Ranking,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
