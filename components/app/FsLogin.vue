<template>
  <form class="form" @submit.prevent="submitLogin">
    <h2 class="title">
      Login
    </h2>

    <base-fs-input
      v-model="email"
      type="email"
      placeholder="E-mail"
      icon="mdi:email"
      required
    />

    <base-fs-input
      v-model="password"
      type="password"
      placeholder="Password"
      icon="mdi:password"
      required
    />

    <base-fs-errors :errors="errors" />

    <div class="actions">
      <a href="#" class="forgot-password">
        Esqueceu a senha ?
      </a>

      <base-fs-button>
        Entrar
      </base-fs-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { BaseFsButton, BaseFsErrors, BaseFsInput } from '#components'

const auth = useAuth()

const email = ref<string>()
const password = ref<string>()
const errors = ref<string>()

async function submitLogin (): Promise<void> {
  try {
    if (!email || !password) {
      throw new Error('required fields')
    }

    await auth.login(email.value, password.value)

    navigateTo('/')
  } catch (error) {
    if (error instanceof Error) {
      errors.value = error.message
    }
  }
}
</script>

<style scoped>
  .form {
    @apply bg-white px-4 md:px-6 py-4 rounded w-full md:w-96;
  }

  .title {
    @apply text-lg text-gray-600;
  }

  .actions {
    @apply flex items-center justify-between mt-7 mb-2;
  }

  .forgot-password {
    @apply text-gray-500 hover:underline mr-4;
  }
</style>
