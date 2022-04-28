<template>
  <HomeBackground class="home-bg" />
  <div class="main-content">
    <h1 class="main-title">Draw Something</h1>
    <div>
      <MainButton class="mt-30" @click="start">Start!</MainButton>
    </div>
  </div>
  <DrawDialog v-model="registerVisible" width="20%">
    <input ref="input" class="draw-input" placeholder="Please enter your name" v-model="userName" type="text"
      @keyup.enter="confirm" />
    <MainButton class="mt-30 small" @click="confirm">Confirm</MainButton>
    <MainButton class="mt-30 ml-20 small" @click="cancel">Cancel</MainButton>
  </DrawDialog>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '~/store/user';
import { getCurrentInstance } from 'vue';

const instance = getCurrentInstance();
// const $fetch
const request = instance?.appContext.config.globalProperties.$fetch;
const userStore = useUserStore();
const router = useRouter();
const input = ref();
let registerVisible = ref(false);
let userName = ref('');
function confirm() {
  if (!userName.value) return;
  request.post('/user/addUser', { userName: userName.value }).then(res => {
    console.log(res)
  })
  // userStore.setUserName(userName.value);
  // router.push('/gameHall');
  // registerVisible.value = false;
}

function cancel() {
  registerVisible.value = false;
}

async function start() {
  userName.value = '';
  registerVisible.value = true;
  await nextTick();
  input.value.focus();
}

</script>

<style lang="scss" scoped>
.home-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .main-title {
    font-size: 5vw;
    user-select: none;
  }
}

.register-enter-active,
.register-leave-active {
  transition: all 0.5s ease;
}
</style>