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
        path: "door-:open?",
        name: "level1",
        component: () => import("@/pages/level-1.vue"),
        props: true,
      },
      {
        path: "coming",
        name: "level2",
        component: () => import("@/pages/level-2.vue"),
      },
      {
        path: "rooms",
        name: "level3",
        component: () => import("@/pages/level-3.vue"),
      },
      {
        path: "phone",
        name: "level4",
        component: () => import("@/pages/level-4.vue"),
      },
    ],
  },
  {
    path: "/index",
    name: "start",
    component: () => import("@/views/start.vue"),
  },
  {
    path: "/failure",
    name: "failure",
    component: () => import("@/views/failure.vue"),
  },
  {
    path: "/win",
    name: "win",
    component: () => import("@/views/failure.vue"),
  },
];

export default routes;
