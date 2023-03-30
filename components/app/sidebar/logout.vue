<template>
  <button class="logout" @click="auth.logout">
    <Icon class="logout-icon" name="mdi:logout" />

    {{ $t('logout') }}
  </button>
</template>

<script setup lang="ts">
import { Icon } from '#components'

const auth = useAuth()
</script>

<style scoped>
  .logout {
    @apply text-base absolute bottom-10 py-1 ml-5 text-red-500;
  }

  .logout-icon {
    @apply text-xl;
  }
</style>
