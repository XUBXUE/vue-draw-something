<template>
  <div class="pigment" title="Change Color">
    <svg
      id="pigmentId"
      class="icon"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      :style="{ color: currentLineColor }"
      @click="showColorList"
    >
      <path
        id="pigmentId"
        fill="currentColor"
        d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5c0-.39-.15-.74-.39-1.01c-.23-.26-.38-.61-.38-.99c0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5c0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9S8 9.67 8 10.5S7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
      />
    </svg>
    <transition name="pigment">
      <div class="color-list" v-show="colorListVisible" @click.stop>
        <ul class="color-wrapper">
          <li
            class="color-item"
            v-for="color in colors"
            :key="color.color"
            @click.stop="selectColor(color.color)"
          >
            <img :src="color.url" :alt="color.color" :title="color.color" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { getImageUrl } from '../utils';
const props = defineProps({
  width: String,
  height: String,
  lineColor: String
});
const emit = defineEmits(['update:lineColor']);

let colorListVisible = ref(false);
const currentLineColor = computed(() => props.lineColor);
const colors = [
  { url: getImageUrl('../assets/images/black.png'), color: 'black' },
  { url: getImageUrl('../assets/images/blue.png'), color: 'blue' },
  { url: getImageUrl('../assets/images/brown.png'), color: 'brown' },
  { url: getImageUrl('../assets/images/green.png'), color: 'green' },
  { url: getImageUrl('../assets/images/lightblue.png'), color: 'lightblue' },
  { url: getImageUrl('../assets/images/orange.png'), color: 'orange' },
  { url: getImageUrl('../assets/images/pink.png'), color: 'pink' },
  { url: getImageUrl('../assets/images/purple.png'), color: 'purple' },
  { url: getImageUrl('../assets/images/red.png'), color: 'red' },
  { url: getImageUrl('../assets/images/yellow.png'), color: 'yellow' },
];

function showColorList() {
  colorListVisible.value = !colorListVisible.value;
}
function selectColor(color: string) {
  emit('update:lineColor', color);
}


function closeDialog(e: any) {
  const target = e.target;
  if ((target.tagName == 'svg' || target.tagName == 'path') && target.id == "pigmentId") return;
  colorListVisible.value = false;
}
onMounted(() => {
  document.body.addEventListener('click', closeDialog);
});
onBeforeUnmount(() => {
  document.body.removeEventListener('click', closeDialog);
})
</script>

<style lang="scss" scoped>
.pigment {
  position: fixed;
  right: 2vw;
  top: 2vh;
  z-index: 10;
  .icon {
    cursor: pointer;
  }
  .color-list {
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
    .color-wrapper {
      display: flex;
      flex-wrap: wrap;
      .color-item {
        margin: 10px 15px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        user-select: none;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
.pigment-enter-active,
.pigment-leave-active {
  transition: opacity 0.5s ease;
}
.pigment-enter-from,
.pigment-leave-to {
  opacity: 0;
}
</style>