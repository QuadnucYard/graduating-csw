<template>
  <div>
    <Paragraphs :data="level.body" />

    <hr class="border-1 my-2" />
    <template v-if="doorChosen == 0">
      <div class="m-auto w-fit">
        <template v-for="i in settings.level3.doors" :key="i">
          <button class="border-solid border-2 rounded-md shadow m-2 p-1 block" @click="chooseDoor(i)">
            楼小其打开了{{ i }}号房的门
          </button>
        </template>
      </div>
    </template>

    <Transition name="slide-fade">
      <div v-if="doorChosen != 0">
        <Paragraphs :data="`楼小其打开了${doorChosen}号房的门`" />

        <div v-if="doorChosen != settings.level3.trueDoor">
          <Paragraphs :data="level.fail" />
          <div class="text-center">
            <ResetButton />
          </div>
        </div>
        <div v-else>
          <Paragraphs :data="level.succ" />
          <div class="text-center">
            <div class="border-2 rounded border-purple-200 px-4 py-2 text-center w-fit m-auto">
              <span>输入密码：</span>
              <input v-model="password" class="border-2 rounded px-1 w-32" />
              <button class="border-2 rounded border-orange-400 px-1 ml-2" @click="onSubmit">确认</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import levels from "@/assets/levels";
import { settings } from "@/assets/levels";
import { useProgressStore } from "@/stores/progress";

const level = levels[3];

const progressStore = useProgressStore();

const doorChosen = ref(0);

const password = ref("");

const chooseDoor = (i: int) => {
  doorChosen.value = i;
};

const onSubmit = () => {
  if (password.value === settings.level3.pwd) {
    progressStore.updateProgress(3);
  } else {
    progressStore.fail();
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 1.0s ease;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  max-height: 0;
  /* opacity: 0; */
  padding: 0;
}

.dropdown-content {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to {
  max-height: 1000px; /* 根据内容的高度调整 */
  opacity: 1;
}

.slide-fade-leave-from {
  max-height: 1000px; /* 根据内容的高度调整 */
  opacity: 1;
}
</style>
