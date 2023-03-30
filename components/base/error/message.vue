<template v-if="errors">
  <div class="errors">
    {{ errors }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  errors: string;
}>()
</script>

<style scoped>
  .errors {
    @apply text-red-600 mt-2;
  }
</style>
