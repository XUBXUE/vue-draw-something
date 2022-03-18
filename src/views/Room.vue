<template>
  <MyCanvas class="my-canvas" ref="el" />
  <transition name="pigment">
    <ColorPen width="50" height="50"/>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyCanvas from '../components/MyCanvas.vue'
import ColorPen from '../components/ColorPen.vue'

</script>

<style lang="scss" scoped>
.my-canvas {
  position: fixed;
  left: 0;
  z-index: -10;
}
</style>