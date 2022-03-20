<template>
  <section class="hall-container">
    <section class="hall-main-wrapper">
      <header class="hall-header">
        <input class="draw-input" placeholder="Search room" v-model="roomName" type="text" @keyup.enter="searchRoom" />
      </header>
      <main class="hall-main"></main>
    </section>
    <aside class="hall-aside">

    </aside>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let roomName = ref('');
function searchRoom() {
  if (!roomName.value) return;
}
</script>

<style lang="scss" scoped>
.hall-container {
  height: 100%;
  width: 100%;
  display: flex;
  
  .hall-main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #ececec;
    .hall-header {
      display: flex;
      justify-content: space-between;
      height: 8vh;
      border-bottom: 2px solid #ececec;
    }
    .hall-main {
      flex: 1;
    }
  }
  .hall-aside {
    width: 20vw;
  }
}
</style>