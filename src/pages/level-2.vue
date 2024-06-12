<template>
  <div class="hide-scroll">
    <Paragraphs :data="level.pre" class="dark:blur-[1px]" />

    <transition name="fade-slide" mode="out-in">
      <template v-if="isLightOn">
        <div>
          <Paragraphs :data="text1P" />
          <hr class="border-1 my-2" />
          <div class="text-center">
            <button class="text-yellow-500 bg-yellow-100 border-yellow-300 border-2 rounded p-1" @click="inputPassword">
              输入密码
            </button>
          </div>
        </div>
      </template>
    </transition>

    <Flier v-if="!isLightOn">
      <button class="text-gray-900 hover-glow font-bold text-4xl" @click="onToggleLight">开灯</button>
    </Flier>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

import levels from "@/assets/levels";
import { settings } from "@/assets/levels";
import { useProgressStore } from "@/stores/progress";
import { isDark, toggleTheme } from "@/utils/dark";

const level = levels[2];

const progressStore = useProgressStore();

const isLightOn = ref(false);

onMounted(() => {
  isDark.value = !isLightOn.value;
});

const text1P = computed(() => {
  const days = -dayjs().diff("2024-06-14 23:59:59", "day");
  const daysText = days > 0 ? `还有${days}天。` : "就是今日！";
  return level.body.replace("{days}", daysText);
});

const onToggleLight = (e: MouseEvent) => {
  isLightOn.value = !isLightOn.value;
  toggleTheme(e);
};

const inputPassword = () => {
  const pwd = prompt("保险箱密码");
  if (pwd === settings.level2.pwd) {
    progressStore.updateProgress(2);
  }
};
</script>

<style scoped lang="scss">
.hover-glow:hover {
  text-shadow: 0 0 5px transparentize($color: yellow, $amount: 0.5);
  // 0 0 10px yellow,
  // 0 0 15px yellow,
  // 0 0 20px yellow;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
