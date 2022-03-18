<template>
  <MyCanvas class="my-canvas" ref="el" />
  <Pigment width="50" height="50"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyCanvas from '../components/MyCanvas.vue'
import Pigment from '../components/Pigment.vue'

</script>

<style lang="scss" scoped>
.my-canvas {
  position: fixed;
  left: 0;
  z-index: -10;
}
</style>