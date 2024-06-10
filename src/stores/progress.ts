import { defineStore } from "pinia";

import { settings } from "@/assets/levels";

export const useProgressStore = defineStore("progress", () => {
  const progress = ref(0);
  const level1Done = ref(false);

  const router = useRouter();

  const reset = () => {
    progress.value = 0;
    level1Done.value = false;
    router.push({ name: `level${1}` });
  };

  const updateProgress = (prog: number) => {
    if (progress.value < 0) {
      return;
    }
    progress.value = prog;
    if (prog < settings.levelNum) {
      router.push({ name: `level${prog + 1}` });
    }
  };

  const fail = () => {
    progress.value = -1;
    router.push({ name: "failure" });
  };

  return { progress, level1Done, reset, updateProgress, fail };
});
