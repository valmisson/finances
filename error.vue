<template>
  <div class="app">
    <app-sidebar v-if="isLogged" />

    <main>
      <h1>
        {{ error?.statusCode }}
      </h1>

      <p class="error-message">
        {{ error?.message }}
      </p>

      <p v-if="error?.stack && isDev" class="error-stack">
        {{ error?.stack }}
      </p>

      <base-button class="btn" @click="backPageHome">
        Voltar para Home
      </base-button>
    </main>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
const nuxtConfig = useRuntimeConfig()
const auth = useAuth()

const isLogged = computed(() => auth.isLogged())
const isDev = computed(() => nuxtConfig.public.isDev)

const props = defineProps({
  error: Object
})

const backPageHome = () => clearError({ redirect: '/' })

useHead({
  title: `${props.error?.statusCode} - ${props.error?.message} | ${appConfig.title}`
})
</script>

<style scoped>
  .app {
    @apply flex flex-col lg:flex-row min-h-screen
    bg-zinc-100;
  }

  main {
    @apply flex justify-center items-center flex-col max-w-full lg:w-[calc(100%_-_15rem)] 2xl:w-2/3
    text-gray-700 mx-4 md:mx-12 mt-7 max-lg:z-20;
  }

  h1 {
    @apply text-7xl lg:text-[10rem] font-medium leading-none;
  }

  .error-message {
    @apply text-xl lg:text-4xl mt-8;
  }

  .error-stack {
    @apply text-lg lg:text-xl text-red-500 mt-6 lg:mt-10
    bg-red-50 rounded-lg px-4 py-2 w-full
    overflow-x-scroll;
  }

  .btn {
    @apply my-12 lg:my-16;
  }
</style>
