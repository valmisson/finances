<template>
  <div class="card-actions">
    <slot />
  </div>
</template>

<style scoped>
  .card-actions {
    @apply flex justify-end w-full mt-2;
  }
</style>
