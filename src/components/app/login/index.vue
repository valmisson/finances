<template>
  <form class="form" @submit.prevent="submitLogin">
    <h2 class="title">
      {{ $t('login') }}
    </h2>

    <base-field-text
      v-model="email"
      type="email"
      :placeholder="$t('email')"
      icon="mdi:email"
      required
    />

    <base-field-text
      v-model="password"
      type="password"
      :placeholder="$t('password')"
      icon="mdi:password"
      required
    />

    <base-error-message :errors="errors" />

    <div class="actions">
      <a href="#" class="forgot-password">
        {{ $t('forgotPassword') }}
      </a>

      <base-button>
        {{ $t('signIn') }}
      </base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
const auth = useAuth()

const email = ref<string>('')
const password = ref<string>('')
const errors = ref<string>('')

async function submitLogin (): Promise<void> {
  try {
    if (!email.value || !password.value) {
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
    @apply bg-white px-4 md:px-6 py-4 rounded lg:w-96;
  }

  .fs-input {
    @apply mt-6;
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
