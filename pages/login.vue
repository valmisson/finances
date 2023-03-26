<template>
  <main class="login">
    <h1 class="title">
      {{ appConfig.title }}
    </h1>

    <app-fs-login />
  </main>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  title: 'Login'
})

definePageMeta({
  layout: 'basic'
})
</script>

<style scoped>
  .login {
    @apply sm:grid sm:justify-center sm:items-center
      px-6 sm:px-2 pt-24 md:pt-40;
  }

  .title {
    @apply text-gray-600 text-3xl text-center
      font-semibold mb-10 md:mb-14;
  }
</style>
