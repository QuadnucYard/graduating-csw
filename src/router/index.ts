import { type Router, createRouter, createWebHistory } from "vue-router";

import { settings } from "@/assets/levels";
import { useProgressStore } from "@/stores/progress";

import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "main") {
    const progressStore = useProgressStore();
    if (progressStore.progress < 0) {
      next({ name: "start" });
    } else if (progressStore.progress < settings.levelNum) {
      next({ name: `level${progressStore.progress + 1}` });
    } else {
      next({ name: "win" });
    }
    return;
  }

  const levelName = to.name;
  if (!levelName) return;
  const progressStore = useProgressStore();
  const levelRoutes = [1, 2, 3, 4].map((x) => `level${x}`);
  const levelIndex = levelRoutes.indexOf(levelName as string);

  if (levelIndex === -1 || levelIndex <= progressStore.progress) {
    next();
  } else {
    next(false);
  }
});

export default router;
