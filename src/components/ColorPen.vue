<template>
  <div class="color-pen" title="Change Width">
    <svg
      class="icon"
      id="penId"
      :width="width"
      :height="height"
      viewBox="0 0 256 256"
      :style="{ color: lineColor }"
      @click="showPenList"
    >
      <path
        id="penId"
        fill="currentColor"
        d="M224 76.7L179.3 32a15.9 15.9 0 0 0-22.6 0l-120 120a15.4 15.4 0 0 0-3.6 5.5l-.2.5a16 16 0 0 0-.9 5.3V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.3L224 99.3a16.1 16.1 0 0 0 0-22.6Zm-80-9.4L160.7 84L68 176.7L51.3 160ZM48 208v-28.7L76.7 208Zm48-3.3L79.3 188L172 95.3l16.7 16.7Z"
      />
    </svg>
    <transition name="color-pen">
      <div class="pen-list" v-show="penListVisible" @click.stop>
        <ul class="pen-wrapper">
          <li
            class="pen-item"
            v-for="(i, index) in pens"
            :key="index"
            @click.stop="selectPen(i.width)"
          >
            <div
              class="pen"
              :style="{ 'width': `${(index + 1) * 6}px`, 'height': `${(index + 1) * 6}px` }"
            />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
const props = defineProps({
  width: String,
  height: String,
  lineWidth: Number,
  lineColor: String
});
const emit = defineEmits(['update:lineWidth']);
const pens = [
  { width: 2 },
  { width: 5 },
  { width: 10 },
  { width: 15 },
  { width: 20 },
];

let penListVisible = ref(false);
function showPenList() {
  penListVisible.value = !penListVisible.value;
}
function selectPen(width: number) {
  emit('update:lineWidth', width);
}

function closeDialog(e: any) {
  const target = e.target;
  if ((target.tagName == 'svg' || target.tagName == 'path') && target.id == 'penId') return;
  penListVisible.value = false;
}
onMounted(() => {
  document.body.addEventListener('click', closeDialog);
});
onBeforeUnmount(() => {
  document.body.addEventListener('click', closeDialog);
});
</script>

<style lang="scss" scoped>
.color-pen {
  position: fixed;
  right: 6vw;
  top: 2vh;
  z-index: 10;
  .icon {
    cursor: pointer;
  }
  .pen-list {
    position: absolute;
    top: 70px;
    right: 0;
    width: 400px;
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
    .pen-wrapper {
      display: flex;
      flex-wrap: wrap;
      .pen-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 15px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        user-select: none;
        .pen {
          border-radius: 50%;
          background-color: #000;
        }
      }
    }
  }
}
.color-pen-enter-active,
.color-pen-leave-active {
  transition: opacity 0.5s ease;
}
.color-pen-enter-from,
.color-pen-leave-to {
  opacity: 0;
}
</style>