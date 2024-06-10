import type { RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    redirect: { name: "level1" },
    component: () => import("@/layouts/main.vue"),
    children: [
      {
        path: "level1",
        redirect: { name: "level1" },
      },
      {
        path: "door-closed",
        name: "level1",
        alias: "door-open",
        component: () => import("@/pages/level-1.vue"),
      },
      {
        path: "level2",
        name: "level2",
        component: () => import("@/pages/level-2.vue"),
      },
      {
        path: "level3",
        name: "level3",
        component: () => import("@/pages/level-3.vue"),
      },
      {
        path: "level4",
        name: "level4",
        component: () => import("@/pages/level-4.vue"),
      },
    ],
  },
  {
    path: "/failure",
    name: "failure",
    component: () => import("@/layouts/failure.vue"),
  },
];

export default routes;
