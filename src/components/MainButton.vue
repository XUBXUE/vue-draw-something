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
  border: none;
  border-radius: 5px;
  color: #FFF;
  background-color: #2c3e50;
  outline: none;
  cursor: pointer;
}
.main-btn:hover {
  background-color: #20565e;
}
.main-btn:active {
  background-color: #2c3e50;
}
</style>