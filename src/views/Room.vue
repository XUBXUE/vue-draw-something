<template>
  <MyCanvas />
  <ChatBoard ref="charBoard" v-show="showCharBoard" />
  <Subject />
</template>

<script setup lang="ts">
import MyCanvas from '../components/MyCanvas.vue';
import ChatBoard from '../components/ChatBoard.vue';
import Subject from '../components/Subjest.vue';
import { onMounted, onUnmounted, ref } from 'vue';

let showCharBoard = ref(false);
const charBoard = ref();

function enterMessage(event: any) {
  if (event.target.tagName.toUpperCase() == 'BODY') {
    if (event.key == 'Enter') {
      if (!showCharBoard.value) showCharBoard.value = true;
      charBoard.value.focusInput();
    }
  }
}

function closeChatBoard() {
  if(showCharBoard.value) showCharBoard.value = false;
}
onMounted(async () => {
  document.addEventListener('keyup', enterMessage);
  document.addEventListener('click', closeChatBoard);
});
onUnmounted(() => {
  document.removeEventListener('keyup', enterMessage);
  document.removeEventListener('click', closeChatBoard);
});
</script>

<style lang="scss" scoped>
</style>