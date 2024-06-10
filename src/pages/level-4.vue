<template>
  <div>
    <Paragraphs :data="level.pre" />
    <hr class="border-1 my-2" />
    <template v-if="chosen === undefined">
      <div class="grid grid-cols-2 gap-4 mx-auto w-fit">
        <template v-for="(item, i) in goals" :key="item.title">
          <button class="border-solid border-2 rounded-lg text-center" @click="chooseApp(i)">
            {{ item.title }}
          </button>
        </template>
      </div>
    </template>
    <div v-if="chosen !== undefined">
      <div>
        <Paragraphs :data="goals[chosen].content" />
        <div>
          <img v-if="goals[chosen].icon" :src="imageUrl(goals[chosen].icon!)" class="ml-auto my-2" />
        </div>
        <div class="my-auto"></div>
        <div v-if="goals[chosen].achievement" class="text-center">
          <ResetButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import levels, { goals } from "@/assets/levels";

const level = levels[4];

const chosen = ref<int | undefined>(undefined);

const imageUrl = (name: string) => new URL(`../assets/img/${name}`, import.meta.url).href;

const chooseApp = (i: int) => {
  chosen.value = i;
};
</script>

<style scoped></style>
