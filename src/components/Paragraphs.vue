<template>
  <div ref="block" class="paragraphs">
    <p v-for="(p, i) in props.data.split('\n')" :key="i">{{ p }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ data: string }>();

const block = ref<HTMLElement>();
// const

const getText = () => {
  return block.value?.innerText;
};

const getTexts = () => {
  const p: string[] = [];
  const parent = block.value;
  if (!parent) return p;
  for (const ch of parent.childNodes.values()) {
    const text = ch.textContent;
    if (!text) continue;
    if (text.trim().length > 0) {
      p.push(text.trim());
    }
  }
  return p;
};

defineExpose({ getText, getTexts });
</script>

<style scoped>

</style>
