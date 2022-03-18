<template>
  <div class="pigment" title="Change Color">
    <svg class="colorPen" :width="width" :height="height" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M224 76.7L179.3 32a15.9 15.9 0 0 0-22.6 0l-120 120a15.4 15.4 0 0 0-3.6 5.5l-.2.5a16 16 0 0 0-.9 5.3V208a16 16 0 0 0 16 16h168a8 8 0 0 0 0-16H115.3L224 99.3a16.1 16.1 0 0 0 0-22.6Zm-80-9.4L160.7 84L68 176.7L51.3 160ZM48 208v-28.7L76.7 208Zm48-3.3L79.3 188L172 95.3l16.7 16.7Z"
      />
    </svg>
    <div class="color-list"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  width: String,
  height: String
})
</script>

<style lang="scss" scoped>
.pigment {
  position: absolute;
  right: 2vw;
  top: 2vh;
  .colorPen {
    cursor: pointer;
  }
  .color-list {
    position: absolute;
    top: 70px;
    right: 0;
    width: 300px;
    height: 150px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
    &::after {
      content: '';
      position: absolute;
      top: -17px;
      right: 20px;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: #fff;
    }
  }
}
</style>