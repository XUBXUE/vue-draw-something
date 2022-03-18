<template>
  <HomeBackground class="home-bg"/>
  <div class="main-content">
    <h1 class="main-title">Draw Something</h1>
    <MainButton class="mt-20" @click="start">Start!</MainButton>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import HomeBackground from '../components/HomeBackground.vue';
import MainButton from '../components/MainButton.vue';
const router = useRouter();

function start() {
  router.push('/room');
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
</style>