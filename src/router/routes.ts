import { settings } from "@/assets/levels";
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
        path: settings.level1.path,
        name: "level1",
        component: () => import("@/pages/level-1.vue"),
        props: true,
      },
      {
        path: settings.level2.path,
        name: "level2",
        component: () => import("@/pages/level-2.vue"),
      },
      {
        path: settings.level3.path,
        name: "level3",
        component: () => import("@/pages/level-3.vue"),
      },
      {
        path: settings.level4.path,
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
