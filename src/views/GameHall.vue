<template>
  <section class="hall-container">
    <section class="hall-main-wrapper">
      <header class="hall-header">
        <input class="draw-input search-input" placeholder="Search Room" v-model="roomName" type="text" @keyup.enter="searchRoom" />
        <MainButton class="small" @click="createGame">Create Game</MainButton>
      </header>
      <main class="hall-main">
        <ul class="room-wrapper">
          <li class="room-item" v-for="i in 20" :key="i">
            <div class="room-detail">
              <span class="room-name">xbx的房间</span>
              <span class="ml-10">(4 / 8)</span>
            </div>
            <MainButton class="small" @click="joinGame">Join Game</MainButton>
          </li>
        </ul>
      </main>
    </section>
    <aside class="hall-aside">
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainButton from '../components/MainButton.vue'
let roomName = ref('');
function searchRoom() {
  if (!roomName.value) return;
}
function createGame() {
  console.log('Create Game!');
}
function joinGame() {
  console.log('Join Game!');
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
      align-items: center;
      height: 8vh;
      padding: 10px 20px;
      border-bottom: 2px solid #ececec;
      .search-input {
        width: 200px;
      }
    }
    .hall-main {
      flex: 1;
      height: 0;
      .room-wrapper {
        height: 100%;
        overflow-y: auto;
        .room-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          border-bottom: 1px solid #ececec;
          .room-detail {
            cursor: pointer;
          }
        }
      }
    }
  }
  .hall-aside {
    width: 20vw;
  }
}
</style>