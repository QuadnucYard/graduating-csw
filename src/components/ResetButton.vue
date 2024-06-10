<template>
  <button class="w-32 h-12 rounded-lg shadow text-red-100 bg-red-600" @click="progressStore.reset()">重启世界线</button>
</template>

<script setup lang="ts">
import { useProgressStore } from "@/stores/progress";

const progressStore = useProgressStore();
</script>

<style scoped></style>
