<template>
  <div class="welcome-container">
    <template v-if="!videoEnded">
      <video ref="videoRef" autoplay playsinline class="welcome-video" @ended="showButton" @click="videoRef?.play()">
        <source src="/start.mp4" type="video/mp4" />
        您的浏览器不支持 HTML5 视频。
      </video>
    </template>
    <template v-else>
      <div class="center-panel text-gray-700 text-center text-2xl space-y-4">
        <div class="text-3xl">做吴院人，上大舞台！</div>
        <button class="border-solid border-2 rounded p-2 bg-gray-100" @click="startGame">上大舞台</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useProgressStore } from "@/stores/progress";

const videoRef = ref<HTMLVideoElement>();

const videoEnded = ref(false);

const progressStore = useProgressStore();

const showButton = () => {
  videoEnded.value = true;
};

const startGame = () => {
  progressStore.updateProgress(0);
};
</script>

<style scoped lang="scss">
.welcome-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.welcome-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: auto;
}

.center-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
