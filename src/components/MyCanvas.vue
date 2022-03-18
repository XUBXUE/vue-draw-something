<template>
  <canvas class="my-canvas" :height="height" :width="width" ref="el" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
const el = ref<HTMLCanvasElement>();
const height = ref(document.body.clientHeight);
const width = ref(document.body.clientWidth);
</script>

<style scoped>

</style>