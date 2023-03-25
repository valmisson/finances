<template>
  <button :class="color">
    <Icon
      v-if="loading"
      name="mdi:loading"
      class="loading"
    />

    <slot v-else />
  </button>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: 'bg-primary text-white hover:bg-primary/75 active:bg-primary/75'
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
  button {
    @apply text-sm uppercase font-medium
      rounded px-8 py-3 transition-all duration-300;
  }

  .loading {
    @apply text-2xl animate-spin;
  }
</style>
