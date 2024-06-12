<template>
  <div>
    <Paragraphs :data="level.pre" />
    <hr class="border-1 my-4" />
    <template v-if="chosen === undefined">
      <div class="border-solid border-4 rounded-lg p-2 m-auto w-fit bg-indigo-50">
        <div class="grid grid-cols-3 gap-4 mx-auto w-fit">
          <template v-for="(item, i) in goals" :key="item.title">
            <button
              class="border-solid border-2 rounded-lg text-sm text-center w-16 h-16 bg-blue-100"
              @click="chooseApp(i)"
            >
              {{ item.title }}
            </button>
          </template>
        </div>
      </div>
    </template>
    <div v-else>
      <div>
        <Paragraphs :data="goals[chosen].content" />
        <Paragraphs v-if="ending" :data="ending" />
        <div>
          <!-- <img v-if="goals[chosen].icon" :src="imageUrl(goals[chosen].icon!)" class="ml-auto my-2" /> -->
        </div>
        <div class="my-auto"></div>
        <div v-if="goals[chosen].achievement" class="text-center trick">
          <ResetButton />
        </div>
      </div>
    </div>

    <Transition name="fade-slide">
      <div v-if="chosen !== undefined && goals[chosen].icon" class="notification">
        <img :src="imageUrl(goals[chosen].icon!)" class="ml-auto my-2" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import levels, { goals, settings } from "@/assets/levels";

const level = levels[4];

const chosen = ref<int | undefined>(undefined);

const ending = ref<string | undefined>();

const imageUrl = (name: string) => new URL(`../assets/img/${name}`, import.meta.url).href;

const chooseApp = (i: int) => {
  chosen.value = i;
  if (goals[i].content === "") {
    const pwd = prompt("输入手机密码");
    if (!pwd) {
      chosen.value = undefined;
      return;
    }
    if (pwd === settings.level4.he) {
      ending.value = level.happy;
    } else {
      ending.value = level.bad;
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 1s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

</style>