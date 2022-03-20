<template>
  <teleport to="body">
    <transition name="dialog">
      <div class="dialog-mask" v-if="modelValue">
        <div class="draw-dialog" :style="{ width: width }">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  width: string,
  modelValue: boolean
}
withDefaults(defineProps<Props>(), {
  width: '50%'
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.dialog-enter-from,
.dialog-leave-to {
  transform: scale(0);
  opacity: 0;
}
.dialog-enter-to,
.dialog-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>