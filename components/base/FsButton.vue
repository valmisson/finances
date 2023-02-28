<template>
  <button :class="color">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'bg-primary text-white'
  }
})
</script>

<style scoped>
  button {
    @apply text-sm
      uppercase font-medium rounded px-8 py-3;
  }
</style>
