<template>
  <div class="app">
    <app-fs-sidebar />

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { AppFsSidebar } from '#components'

const config = useAppConfig()

useHead({
  titleTemplate (title) {
    return title ? `${title} - ${config.title}` : config.title
  }
})
</script>

<style scoped>
  .app {
    @apply flex flex-col lg:flex-row min-h-screen
    bg-zinc-100;
  }

  .main {
    @apply max-w-full lg:w-[calc(100%_-_15rem)] 2xl:w-2/3
    text-gray-700 mx-4 md:mx-12 mt-7 max-lg:z-20;
  }
</style>
