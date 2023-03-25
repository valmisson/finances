<template>
  <form @submit.prevent="onSubmit">
    <slot />

    <div class="actions">
      <base-button :loading="loading">
        Enviar
      </base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  BaseButton
} from '#components'

const props = defineProps<{
  loading?: boolean
  modelValue: string
}>()

const emit = defineEmits(['submit', 'update:modelValue'])

function onSubmit (): void {
  emit('update:modelValue', props.modelValue)
  emit('submit', props.modelValue)
}
</script>

<style scoped>
  form {
    @apply grid grid-cols-1 lg:grid-cols-3
      max-lg:gap-y-3 gap-x-4 lg:gap-x-8;
  }

  label {
    @apply text-sm;
  }

  form .actions {
    @apply col-span-1 lg:col-span-3 flex justify-end
      mt-7 mb-2 h-12;
  }
</style>
