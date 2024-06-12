import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "main",
    component: () => import("@/layouts/main.vue"),
    children: [
      {
        path: "level1",
        redirect: "door-closed",
      },
      {
        path: "door-:open",
        name: "level1",
        component: () => import("@/pages/level-1.vue"),
        props: true,
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
  {
    path: "/win",
    name: "win",
    component: () => import("@/layouts/failure.vue"),
  },
];

export default routes;
