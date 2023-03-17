<template>
  <section class="loading">
    Carregando...
  </section>
</template>

<style scoped>
  .loading {
    @apply flex justify-center items-center text-sm
      bg-white text-gray-500 space-x-2 w-full
      animate-pulse py-4;
  }
</style>
