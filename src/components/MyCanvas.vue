<template>
  <canvas class="my-canvas" :height="height" :width="width" ref="el" />
  <Pigment
    :width="iconSize"
    :height="iconSize"
    v-model:lineColor="lineColor"
  />
  <ColorPen
    :width="iconSize"
    :height="iconSize"
    :lineColor="lineColor" 
    v-model:lineWidth="lineWidth"
  />
  <div>Reset</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Pigment from './Pigment.vue';
import ColorPen from './ColorPen.vue';
import { useStorage } from '@vueuse/core';

const iconSize = '50';
let lineColor = useStorage('currentLineColor', 'black');
let lineWidth = useStorage('currentLineWidth', 1);

const height = ref(document.body.clientHeight);
const width = ref(document.body.clientWidth);

const el = ref<HTMLCanvasElement>();
const ctx = computed(() => el.value!.getContext('2d'));

function initCanvas(el: HTMLCanvasElement) {
  el.onmousedown = (e) => {
    let positionX = e.clientX - el.offsetLeft;
    let positionY = e.clientY - el.offsetTop;
    ctx.value!.strokeStyle = lineColor.value!;
    ctx.value!.lineWidth = (lineWidth.value! - 1) * 3 + 3;
    ctx.value!.shadowBlur = 2;
    ctx.value!.shadowColor = lineColor.value!;
    ctx.value?.beginPath();
    ctx.value!.moveTo(positionX, positionY);
    el.onmousemove = (e) => {
      let positionX = e.clientX - el.offsetLeft;
      let positionY = e.clientY - el.offsetTop;
      ctx.value!.lineTo(positionX, positionY);
      ctx.value!.stroke();
    }
    el.onmouseup = () => {
      el.onmousemove = null;
    }
  }
}

onMounted(() => {
  initCanvas(el.value!);
});
</script>

<style lang="scss" scoped>
.my-canvas {
  position: fixed;
  left: 0;
}
</style>