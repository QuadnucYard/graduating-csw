<template>
  <div class="absolute" :style="style">
    <slot class="m-auto" style="transform: translate(-50%, -50%)" />
  </div>
</template>

<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

const props = withDefaults(defineProps<{ flying?: boolean; decayRate?: number }>(), {
  flying: true,
  decayRate: 1e-4,
});

const { width, height } = useWindowSize();

let timer: number | undefined = undefined;

const mouse = useMouse();
const flierPos = reactive({
  x: width.value * (Math.random() * 0.1 + 0.8),
  y: height.value * (Math.random() * 0.1 + 0.8),
});
// const flierPos = reactive({ x: 0, y: 0 });
const vel = { x: 0, y: 0 };
const style = computed(() => ({ left: `${flierPos.x}px`, top: `${flierPos.y}px` }));

const dt = 0.01;
let em = 8e5;
let ec = -2e-3;

onMounted(() => {
  timer = setInterval(motion, dt * 1000);
});

onUnmounted(() => clearInterval(timer));

const motion = () => {
  if (!props.flying) {
    return;
  }

  const mdx = flierPos.x - mouse.x.value;
  const mdy = flierPos.y - mouse.y.value;
  const mdr = Math.max(Math.sqrt(mdx * mdx + mdy * mdy), 10.0);

  const cdx = flierPos.x - width.value / 2;
  const cdy = flierPos.y - height.value / 2;
  const cdr = Math.max(Math.sqrt(cdx * cdx + cdy * cdy), 10.0);

  const ax = (mdx / (mdr * mdr * mdr)) * em + cdx * cdr * ec;
  const ay = (mdy / (mdr * mdr * mdr)) * em + cdy * cdr * ec;

  vel.x += ax * dt;
  vel.y += ay * dt;

  flierPos.x += vel.x * dt;
  flierPos.y += vel.y * dt;

  em *= Math.exp(-props.decayRate);
  ec *= Math.exp(-props.decayRate);
};
</script>

<style scoped></style>
