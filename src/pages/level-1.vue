<template>
  <div>
    <Paragraphs :data="level.body" />
    <hr class="border-1 my-2" />
    <template v-if="!isOpen">
      <Paragraphs ref="p1" :data="level.end_fake" />
      <div class="text-orange-500 text-center">（提示：请你用你的力量干涉这个世界，帮助楼小其打开门吧！）</div>
    </template>
    <template v-else>
      <Paragraphs :data="level.end_true" />
      <div class="text-center">
        <button class="text-green-500 bg-green-100 rounded border-green-400 border-2 p-2" @click="pass">你过关!</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import levels from "@/assets/levels";
import Paragraphs from "@/components/Paragraphs.vue";
import { useProgressStore } from "@/stores/progress";

const level = levels[1];

const props = defineProps<{ open?: string }>();

const isOpen = computed(() => props.open?.includes("open") === true);

const router = useRouter();

const progressStore = useProgressStore();

const p1 = ref<InstanceType<typeof Paragraphs>>();

let timer: number | undefined = undefined;

onBeforeMount(() => {
  if (!props.open || props.open.length === 0) {
    router.replace("door-closed");
  }
});

onMounted(() => {
  if (!isOpen.value) {
    if (!props.open || props.open.length === 0) {
      router.replace("door-closed");
    }
    timer = setInterval(checkPass, 1000);
  }
});

onUnmounted(() => clearInterval(timer));

const checkPass = () => {
  if (isOpen.value) return;
  const texts = p1.value?.getTexts();
  if (texts?.length != 3) return;
  const text = texts[0];
  if (!text) return;
  if (text.includes("门") && text.includes("开") && !text.includes("闭") && !text.includes("关")) {
    router.replace("door-open");
    clearInterval(timer);
    timer = undefined;
  }
};

const pass = () => {
  progressStore.updateProgress(1);
};
</script>

<style scoped></style>
