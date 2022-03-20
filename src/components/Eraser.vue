<template>
  <div class="erasers" title="Eraser">
    <svg
      id="eraserId"
      class="icon"
      :width="width"
      :height="height"
      viewBox="0 0 256 256"
      @click="showEraserList"
    >
      <path
        id="eraserId"
        fill="currentColor"
        d="M111 215.8H72.1L35 178.7a15.9 15.9 0 0 1 0-22.6l56.6-56.6l67.8 67.9Z"
        opacity=".2"
      />
      <path
        id="eraserId"
        fill="currentColor"
        d="M216 207.8h-85.7l34.8-34.7l56.6-56.6a24.1 24.1 0 0 0 0-33.9l-45.3-45.3a24 24 0 0 0-33.9 0L85.9 93.9l-56.6 56.6a24 24 0 0 0 0 33.9l37.1 37.1a8.1 8.1 0 0 0 5.7 2.3H216a8 8 0 0 0 0-16ZM153.8 48.6a8.1 8.1 0 0 1 11.3 0l45.2 45.3a7.9 7.9 0 0 1 0 11.3l-50.9 50.9l-56.5-56.6ZM75.4 207.8l-34.8-34.7a8.1 8.1 0 0 1 0-11.3l51-50.9l56.5 56.5l-40.4 40.4Z"
      />
    </svg>
    <transition name="eraser">
      <div class="eraser-list" v-show="eraserListVisible" @click.stop>
        <ul class="eraser-wrapper">
          <li
            class="eraser-item"
            v-for="(i, index) in erasers"
            :key="index"
            @click.stop="selectEraser(i)"
          >
            <div
              :class="['eraser', i.shape]"
              :style="{ 'width': `${i.width * 2}px`, 'height': `${i.width * 2}px` }"
            />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { Eraser } from '../common/interface';
defineProps({
  width: String,
  height: String,
});
const emit = defineEmits(['selectEraser']);
let eraserListVisible = ref(false);
const erasers = [
  { width: 4, shape: 'circle' },
  { width: 8, shape: 'circle' },
  { width: 12, shape: 'circle' },
  { width: 16, shape: 'circle' },
  { width: 20, shape: 'circle' },
  { width: 4, shape: 'square' },
  { width: 8, shape: 'square' },
  { width: 12, shape: 'square' },
  { width: 16, shape: 'square' },
  { width: 20, shape: 'square' },
];
function selectEraser(eraser: Eraser) {
  emit('selectEraser', eraser);
  eraserListVisible.value = false;
}
function showEraserList() {
  eraserListVisible.value = !eraserListVisible.value;
}

function closeDialog(e: any) {
  const target = e.target;
  if ((target.tagName == 'svg' || target.tagName == 'path') && target.id == 'eraserId') return;
  eraserListVisible.value = false;
}
onMounted(() => {
  document.body.addEventListener('click', closeDialog);
});
onBeforeUnmount(() => {
  document.body.addEventListener('click', closeDialog);
});
</script>

<style lang="scss" scoped>
.erasers {
  position: fixed;
  right: 10vw;
  top: 2vh;
  z-index: 10;
  .icon {
    cursor: pointer;
  }
  .eraser-list {
    position: absolute;
    top: 70px;
    right: 0;
    width: 350px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 6px 3px 8px 3px rgba(0, 0, 0, 0.2);
    &::after {
      content: "";
      position: absolute;
      top: -17px;
      right: 20px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: #fff;
    }
    .eraser-wrapper {
      display: flex;
      flex-wrap: wrap;
      .eraser-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 15px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        user-select: none;
        .eraser {
          border: 2px solid #000;
          box-sizing: border-box;
          &.circle {
            border-radius: 50%;
          }
        }
      }
    }
  }
}

.eraser-enter-active,
.eraser-leave-active {
  transition: opacity 0.5s ease;
}
.eraser-enter-from,
.eraser-leave-to {
  opacity: 0;
}
</style>