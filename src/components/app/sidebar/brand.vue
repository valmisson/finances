<template>
  <h1 class="brand">
    <a href="/">
      {{ appConfig.title }}
    </a>
  </h1>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<style scoped>
  .brand {
    @apply text-2xl font-semibold;
  }
</style>
