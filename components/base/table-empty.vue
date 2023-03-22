<template>
  <div class="table-empty">
    <slot />
  </div>
</template>

<style scoped>
  .table-empty {
    @apply bg-white text-gray-400 text-sm w-full
      flex justify-center py-4 border-t border-separate;
  }

  .card .table-empty {
    @apply pb-1;
  }
</style>
