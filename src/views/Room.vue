<template>
  <MyCanvas />
  <ChatBoard ref="charBoard" v-show="showCharBoard" />
</template>

<script setup lang="ts">
import MyCanvas from '../components/MyCanvas.vue';
import ChatBoard from '../components/ChatBoard.vue';
import { onMounted, ref } from 'vue';

let showCharBoard = ref(false);
const charBoard = ref();

onMounted(() => {
  document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
      if (!showCharBoard.value) showCharBoard.value = true;
      console.log(charBoard.value.focusInput)
      charBoard.value.focusInput();
    }
  })
});
</script>

<style lang="scss" scoped>
</style>