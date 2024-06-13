<template>
  <div class="hide-scroll">
    <Paragraphs :data="level.pre" class="dark:blur-[1px]" />

    <Transition name="fade-simple">
      <Paragraphs v-if="switchClicked" :data="level.mid" class="dark:blur-[1px]" />
    </Transition>

    <transition name="fade-slide" mode="out-in">
      <template v-if="isLightOn">
        <div>
          <Paragraphs :data="text1P" />
          <!-- <hr class="border-1 my-2" /> -->
          <div class="text-center">
            <button
              class="text-yellow-500 bg-yellow-100 border-yellow-300 border-2 rounded p-1 opacity-0 hover:opacity-100"
              @click="inputPassword"
            >
              输入密码
            </button>
          </div>
        </div>
      </template>
    </transition>

    <Flier v-if="!isLightOn" :flying="switchClicked">
      <button
        class="text-gray-900 font-bold text-4xl"
        :class="{ 'hover-glow': switchClicked }"
        :style="{ 'user-select': switchClicked ? 'auto' : 'none' }"
        @click="onToggleLight"
      >
        开灯
      </button>
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
const switchClicked = ref(false);

onMounted(() => {
  isLightOn.value = progressStore.progress >= 2;
  isDark.value = !isLightOn.value;
  if (isDark.value) {
    document.body.style.overflowY = "hidden";
  }
});

const text1P = computed(() => {
  const days = -dayjs().diff("2024-06-14 23:59:59", "day");
  const daysText = days > 0 ? `还有${days}天。` : "就是今日！";
  return level.body.replace("{days}", daysText);
});

const onToggleLight = (e: MouseEvent) => {
  if (!switchClicked.value) {
    switchClicked.value = true;
  } else {
    isLightOn.value = !isLightOn.value;
    document.body.style.overflowY = "auto";
    toggleTheme(e);
  }
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

.fade-simple-enter-active,
.fade-simple-leave-active {
  transition: all 2s ease;
}

.fade-simple-enter-from {
  opacity: 0;
  color: yellowgreen;
}

.fade-simple-enter-to {
  opacity: 1;
}
</style>
