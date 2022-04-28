<template>
  <section class="hall-container">
    <section class="hall-main-wrapper">
      <header class="hall-header">
        <input
          class="draw-input search-input"
          placeholder="Search Room"
          v-model="searchRoomName"
          type="text"
          @keyup.enter="searchRoom"
        />
        <MainButton class="small" @click="createGame">Create Game</MainButton>
      </header>
      <main class="hall-main">
        <ul class="room-wrapper">
          <li class="room-item" v-for="i in 5" :key="i">
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
      <ul class="users-wrapper">
        <li class="online-users">在线人数</li>
        <li class="user-item" v-for="user in onlineUsers" :key="user.userName">
          <span>{{ user.userName }}</span>
          <span class="online">{{user.userStatus == '0' ? '空闲' : '游戏中'}}</span>
        </li>
      </ul>
    </aside>
  </section>
  <DrawDialog v-model="createrVisible" width="20%">
    <input
      ref="input"
      class="draw-input"
      placeholder="Please enter room name"
      v-model="createRoomName"
      type="text"
      @keyup.enter="confirm"
    />
    <MainButton class="mt-30 small" @click="confirm">Confirm</MainButton>
    <MainButton class="mt-30 ml-20 small" @click="cancel">Cancel</MainButton>
  </DrawDialog>
</template>

<script setup lang="ts">
import { nextTick, ref, inject, onUnmounted, computed } from 'vue';
import MainButton from '../components/MainButton.vue';
import DrawDialog from '../components/DrawDialog.vue';
import useUserStore from '../store/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const socket = inject('socket') as any;

const onlineUsers = computed(() => userStore.onlineUser);
let searchRoomName = ref('');
let createrVisible = ref(false);
let createRoomName = ref('');
let input = ref();

socket.on('getUsers', users => {
  console.log('users', users)
  userStore.updateUsers(users);
});
socket.on('newUser', user => {
  if (userStore.onlineUser.findIndex(i => i.userName == user.userName) == -1) {
    userStore.addUsers(user);
  }
});

function searchRoom() {
  if (!searchRoomName.value) return;
}
async function createGame() {
  createRoomName.value = '';
  createrVisible.value = true;
  await nextTick();
  input.value.focus();
}
function joinGame() {
  router.push('/room');
}

function confirm() {
  if (!createRoomName.value) return;
  createrVisible.value = false;
  router.push('/room');
}
function cancel() {
  createrVisible.value = false;
}
onUnmounted(() => {
  // socket.emit('disconnect', )
});
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
    .users-wrapper {
      height: 100%;
      overflow-y: auto;
      .online-users {
        padding: 10px 0;
        border-bottom: 1px solid #ececec;
      }
      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 15px;
        border-bottom: 1px solid #ececec;
        span {
          cursor: pointer;
        }
      }
    }
  }
}

.online {
  color: lightgreen;
}
.gamine {
  color: red;
}
</style>