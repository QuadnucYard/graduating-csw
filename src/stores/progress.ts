import { useStorage, useWindowScroll } from "@vueuse/core";
import { defineStore } from "pinia";

import { settings } from "@/assets/levels";
import { decryptText, encryptText } from "@/utils/encrypt";

const key = [0, 1, 1, 4, 0, 5, 1, 4, 1, 9, 1, 9, 0, 8, 1, 0];

export const useProgressStore = defineStore("progress", () => {
  const progressStorage = useStorage("progress", "");

  const progress = computed({
    get: () => {
      const a = parseInt(decryptText(progressStorage.value, key));
      return isNaN(a) ? 0 : a;
    },
    set: (v) => (progressStorage.value = encryptText(v.toString(), key)),
  });

  const router = useRouter();

  const reset = () => {
    progress.value = 0;
    router.push({ name: `level${1}` });
  };

  const updateProgress = (prog: number) => {
    if (progress.value < 0) {
      return;
    }
    progress.value = prog;
    if (prog < settings.levelNum) {
      router.push({ name: `level${prog + 1}` });
      const scroll = useWindowScroll();
      scroll.y.value = 0;
    }
  };

  const fail = () => {
    router.push({ name: "failure" });
  };

  return { progress, reset, updateProgress, fail };
});
