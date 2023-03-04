<template>
  <div :class="['table-items', cols]">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  cols: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
  .table-items {
    @apply grid text-base text-gray-500
      border-b border-separate py-3;
  }
</style>
