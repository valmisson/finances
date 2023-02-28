<template>
  <main class="login">
    <h1 class="title">
      {{ appConfig.title }}
    </h1>

    <app-fs-login />
  </main>
</template>

<script setup lang="ts">
import { AppFsLogin } from '#components'

const appConfig = useAppConfig()

useHead({
  title: 'Login'
})
</script>

<style scoped>
  .login {
    @apply grid justify-center items-center
      px-2 pt-24 md:pt-40;
  }

  .title {
    @apply text-gray-600 text-3xl text-center
      font-semibold mb-10 md:mb-14;
  }
</style>
