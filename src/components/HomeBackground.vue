<template>
  <canvas ref="el" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { debounce } from '../utils';

interface Point {
  x: number;
  y: number;
}
interface Branch {
  start: Point;
  length: number;
  angle: number
}

const el = ref<HTMLCanvasElement>();
const ctx = computed(() => el.value!.getContext('2d'));

const height = ref(document.body.clientHeight);
const width = ref(document.body.clientWidth);

const pendingTasks: Function[] = [];

function init() {
  ctx.value!.strokeStyle = 'rgba(100, 100, 100, 0.5)';
  ctx.value!.lineWidth = .1;
  step({
    start: { x: randomStartPoisition(width.value), y: height.value },
    length: 4,
    angle: -Math.PI / 2
  });
  step({
    start: { x: randomStartPoisition(width.value), y: 0 },
    length: 4,
    angle: Math.PI / 2
  });
  step({
    start: { x: 0, y: randomStartPoisition(height.value) },
    length: 4,
    angle: 0
  });
  step({
    start: { x: width.value, y: randomStartPoisition(height.value) },
    length: 4,
    angle: Math.PI
  });
}

function step(branch: Branch, depth = 0) {
  let endPoint = getEndPoint(branch);
  drawBranch(branch);

  if (depth < 5 || Math.random() > 0.5) {
    pendingTasks.push(() => step({
      start: endPoint,
      length: branch.length + (Math.random() * 4 - 2),
      angle: branch.angle + Math.random() * 0.3
    }, depth + 1));
  }
  if (depth < 5 || Math.random() < 0.5) {
    pendingTasks.push(() => step({
      start: endPoint,
      length: branch.length + (Math.random() * 4 - 2),
      angle: branch.angle - Math.random() * 0.3
    }, depth + 1));
  }
}

function frame() {
  const tasks = [...pendingTasks];
  pendingTasks.length = 0;
  tasks.forEach(fn => fn());
}

let framesCount = 0;
function startFrame() {
  requestAnimationFrame(() => {
    framesCount++;
    if (framesCount % 5 == 0) {
      frame();
    }
    startFrame();
  });
}

function drawBranch(branch: Branch) {
  lintTo(branch.start, getEndPoint(branch));
}

function getEndPoint(branch: Branch): Point {
  const point = {
    x: branch.start.x + branch.length * Math.cos(branch.angle),
    y: branch.start.y + branch.length * Math.sin(branch.angle)
  };
  return point;
}

function lintTo(startPoint: Point, endPoint: Point) {
  ctx.value!.beginPath();
  ctx.value!.moveTo(startPoint.x, startPoint.y);
  ctx.value!.lineTo(endPoint.x, endPoint.y);
  ctx.value!.stroke();
}

function randomStartPoisition(length: number, startRange = 3, endRange = 8, count = 10) {
  return length / count * (Math.random() * (endRange - startRange) + startRange);
}

startFrame();
const resetCanvas = debounce(() => {
  height.value = document.body.clientHeight;
  width.value = document.body.clientWidth;
  ctx.value!.clearRect(0, 0, el.value!.width, el.value!.height);
  pendingTasks.length = 0;
  init();
});

onMounted(() => {
  init();
  window.addEventListener('resize', resetCanvas);
});
onBeforeMount(() => {
  window.removeEventListener('resize', resetCanvas);
});
</script>

<style scoped>

</style>