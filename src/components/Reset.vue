
<template>
  <div class="reset" title="Reset">
    <svg class="icon" :width="width" :height="height" viewBox="0 0 32 32" @click="reset">
      <path
        fill="currentColor"
        d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['reset']);
const props = defineProps({
  width: String,
  height: String
})
function reset() {
  emit('reset');
}
</script>

<style lang="scss" scoped>
.reset {
  position: fixed;
  right: 14vw;
  top: 2vh;
  z-index: 10;
  .icon {
    cursor: pointer;
  }
}
</style>