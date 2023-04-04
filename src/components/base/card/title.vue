<template>
  <h3 class="card-title">
    <slot />
  </h3>
</template>

<style scoped>
  .card-title {
    @apply text-gray-400 font-medium text-sm mb-2.5;
  }
</style>
