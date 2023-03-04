<template>
  <div class="app">
    <slot />
  </div>
</template>

<script setup lang="ts">
const config = useAppConfig()

useHead({
  titleTemplate (title) {
    return title ? `${title} - ${config.title}` : config.title
  }
})
</script>

<style scoped>
  .app {
    @apply min-h-screen bg-zinc-100;
  }
</style>
