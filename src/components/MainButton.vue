<template>
  <button class="main-btn">
    <slot />
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.main-btn {
  padding: 10px 20px;
  border: 2px solid #2c3e50;
  border-radius: 5px;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: all .3s;
  &.small {
    padding: 5px 10px;
    font-size: 12px;
  }
}
.main-btn:hover {
  background-color: #2c3e50;
  color: #FFF;
}
</style>