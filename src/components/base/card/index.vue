<template>
  <section class="card">
    <slot />
  </section>
</template>

<style scoped>
.card {
  @apply bg-white rounded px-4 py-3 my-6 lg:my-4 h-fit;
}
</style>
