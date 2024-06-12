<template>
  <transition name="fade-slide" @after-enter="startTimeout">
    <div v-if="visible" class="notification">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  duration: {
    type: Number,
    default: 3000, // 默认显示时间为3秒
  },
});

const visible = ref(true);

const startTimeout = () => {
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  /* opacity: 0; */
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
