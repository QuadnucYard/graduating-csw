<template>
  <div >
    <Paragraphs :data="level.body" />
    <hr class="border-1 my-2" />
    <template v-if="!isDone">
      <Paragraphs ref="p1" :data="level.end_fake" />
      <div class="text-orange-500 text-center">（提示：请你用你的力量干涉这个世界，帮助楼小其打开门吧！）</div>
    </template>
    <template v-else>
      <Paragraphs :data="level.end_true" />
      <div class="text-center">
        <button class="text-green-500 bg-green-100 rounded border-green-400 border-2 p-2" @click="pass">
          你过关!
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import levels from "@/assets/levels"
import Paragraphs from "@/components/Paragraphs.vue";
import { useProgressStore } from "@/stores/progress";

const level = levels[1];

const route = useRoute();

const progressStore = useProgressStore();

const p1 = ref<InstanceType<typeof Paragraphs>>();

const isDone = computed({
  get: () => progressStore.level1Done,
  set: (val: boolean) => (progressStore.level1Done = val),
});

let timer: number | undefined = undefined;

onMounted(() => {
  if (checkUrlPass()) {
    isDone.value = true;
  } else {
    isDone.value = false;
    timer = setInterval(checkPass, 1000);
  }
});

onUnmounted(() => clearInterval(timer));

const checkUrlPass = () => route.path.includes("open");

const checkPass = () => {
  const texts = p1.value?.getTexts();
  if (texts?.length != 3) return;
  const text = texts[0];
  if (!text) return;
  // console.log(text);
  isDone.value =
    checkUrlPass() || (text.includes("门") && text.includes("开") && !text.includes("闭") && !text.includes("关"));
  if (isDone.value) {
    clearInterval(timer);
    timer = undefined;
  }
};

const pass = () => {
  progressStore.updateProgress(1);
}
</script>

<style scoped></style>
