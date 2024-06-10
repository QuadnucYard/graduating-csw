<template>
  <div class="absolute" :style="style">
    <slot class="m-auto" style="transform: translate(-50%, -50%)" />
  </div>
</template>

<script setup lang="ts">
import { useMouse } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();

let timer: number | undefined = undefined;

const mouse = useMouse();
// const flierPos = reactive({ x: width.value / 2, y: height.value / 2 });
const flierPos = reactive({ x: 0, y: 0 });
const vel = { x: 0, y: 0 };
const style = computed(() => ({ left: `${flierPos.x}px`, top: `${flierPos.y}px` }));

const dt = 0.01;

onMounted(() => {
  timer = setInterval(motion, dt * 1000);
});

onUnmounted(() => clearInterval(timer));

const motion = () => {
  // console.log(flierPos, mouse)
  const mdx = flierPos.x - mouse.x.value;
  const mdy = flierPos.y - mouse.y.value;
  const mdr = Math.max(Math.sqrt(mdx * mdx + mdy * mdy), 10.0);

  const cdx = flierPos.x - width.value / 2;
  const cdy = flierPos.y - height.value / 2;
  const cdr = Math.max(Math.sqrt(cdx * cdx + cdy * cdy), 10.0);

  const em = 5e5;
  const ec = -2e-3;

  const ax = (mdx / (mdr * mdr * mdr)) * em + cdx * cdr * ec;
  const ay = (mdy / (mdr * mdr * mdr)) * em + cdy * cdr * ec;

  vel.x += ax * dt;
  vel.y += ay * dt;

  flierPos.x += vel.x * dt;
  flierPos.y += vel.y * dt;};
</script>

<style scoped></style>
