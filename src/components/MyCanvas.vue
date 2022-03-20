<template>
  <canvas class="my-canvas" :height="height" :width="width" ref="el" />
  <Pigment :width="iconSize" :height="iconSize" v-model:lineColor="lineColor" />
  <ColorPen
    :width="iconSize"
    :height="iconSize"
    :lineColor="lineColor"
    v-model:lineWidth="lineWidth"
  />
  <Eraser :width="iconSize" :height="iconSize" @selectEraser="selectEraser" />
  <Reset :width="iconSize" :height="iconSize" @reset="reset" />
  <Revoke :width="iconSize" :height="iconSize" @revoke="revoke" />
  <Recovery :width="iconSize" :height="iconSize" @recovery="recovery" />
  <!-- <teleport to="body">
    <div
      id="eraserMask"
      :class="{'eraser-mask': true, 'circle': eraserMaskShape == 'circle'}"
      :style="{ top: eraserMaskTop + 'px', left: eraserMaskLeft + 'px', width: eraserMaskSize * 2 + 'px', height: eraserMaskSize * 2 + 'px' }"
      v-if="isEraseing"
    ></div>
  </teleport>-->
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import Pigment from './Pigment.vue';
import ColorPen from './ColorPen.vue';
import Reset from './Reset.vue';
import Recovery from './Recovery.vue';
import Revoke from './Revoke.vue';
import Eraser from './Eraser.vue';
import { Eraser as EraserApi } from '../common/interface';
import { useStorage } from '@vueuse/core';

const iconSize = '50';
let lineColor = useStorage('currentLineColor', 'black');
let lineWidth = useStorage('currentLineWidth', 1);
let eraser: EraserApi;
let isEraseing = ref(false);

watch([lineWidth, lineColor], () => {
  if (isEraseing.value) isEraseing.value = false;
});

let step = -1; // 保存每一笔的步骤 做撤销和恢复操作
const drawHistory: string[] = [];

const height = ref(document.body.clientHeight);
const width = ref(document.body.clientWidth);

const el = ref<HTMLCanvasElement>();
const ctx = computed(() => el.value!.getContext('2d'));

function initCanvas(el: HTMLCanvasElement) {
  el.onmousedown = (e) => {
    let positionX = e.clientX - el.offsetLeft;
    let positionY = e.clientY - el.offsetTop;
    if (isEraseing.value) {
      erase(e, el);
    } else {
      ctx.value!.strokeStyle = lineColor.value!;
      ctx.value!.lineWidth = lineWidth.value;
      ctx.value!.shadowBlur = 2;
      ctx.value!.shadowColor = lineColor.value!;
      ctx.value!.beginPath();
      ctx.value!.moveTo(positionX, positionY);
    }
    el.onmousemove = (e) => {
      e.stopPropagation();
      if (isEraseing.value) {
        erase(e, el);
      } else {
        draw(e, el);
      }
    }
    el.onmouseup = () => {
      isEraseing.value = false;
      step++;
      // 如果在绘画完成后发现有可恢复的画画历史记录，则清空可恢复的历史记录
      if (step < drawHistory.length) {
        drawHistory.length = step;
      }
      drawHistory.push(el.toDataURL());
      el.onmousemove = null;
    }
  }
}

// 画画逻辑
function draw(e: MouseEvent, el: HTMLCanvasElement) {
  let positionX = e.clientX - el.offsetLeft;
  let positionY = e.clientY - el.offsetTop;
  ctx.value!.lineTo(positionX, positionY);
  ctx.value!.stroke();
}

// 橡皮擦逻辑
function erase(e: MouseEvent, el: HTMLCanvasElement) {
  ctx.value!.beginPath();
  ctx.value!.fillStyle = "#ffffff";
  ctx.value!.shadowBlur = 0;
  let positionX = e.clientX - el.offsetLeft;
  let positionY = e.clientY - el.offsetTop;
  if (eraser.shape == 'circle') {
    ctx.value!.arc(positionX, positionY, eraser.width, 0, Math.PI * 2, true);
    ctx.value!.fill();
  } else if (eraser.shape == 'square') {
    ctx.value!.fillRect(positionX - eraser.width / 2, positionY - eraser.width / 2, eraser.width * 2, eraser.width * 2);
  }
}

// 撤销逻辑
function revoke() {
  if (step >= 0) {
    step--;
    drawTrack();
  } else {
    alert("It can't be revoked, bro~");
  }
}

// 恢复逻辑
function recovery() {
  if (step < drawHistory.length - 1) {
    step++;
    drawTrack();
  } else {
    alert("It's can't be restored, bro~");
  }
}

// 画出撤销/恢复后的画面
function drawTrack() {
  reset(); // 重置画布
  let canvasPic = new Image();
  canvasPic.src = drawHistory[step];
  canvasPic.addEventListener('load', () => {
    ctx.value!.drawImage(canvasPic, 0, 0);
  });
}

// 选择橡皮擦
function selectEraser(selectEraser: EraserApi) {
  eraser = selectEraser;
  isEraseing.value = true;
}

// 重置画布
function reset() {
  ctx.value!.clearRect(0, 0, el.value!.width, el.value!.height);
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

.eraser-mask {
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
  z-index: 5;
  &.circle {
    border-radius: 50%;
  }
}
</style>