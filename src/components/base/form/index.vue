<template>
  <form @submit.prevent="onSubmit">
    <div
      class="form-fields"
      :class="`cols-${cols}`"
    >
      <slot />
    </div>

    <div class="actions">
      <base-button :loading="loading">
        {{ $t('send') }}
      </base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  loading?: boolean
  cols?: string
}>(), {
  cols: '3'
})

const emit = defineEmits(['submit'])

function onSubmit (): void {
  emit('submit')
}
</script>

<style scoped>
  .form-fields {
    @apply grid grid-cols-1 max-lg:gap-y-3
      gap-x-4 lg:gap-x-8;
  }

  .cols-3 {
    @apply lg:grid-cols-3;
  }

  .cols-4 {
    @apply lg:grid-cols-4;
  }

  label {
    @apply text-sm;
  }

  .actions {
    @apply flex justify-end mt-7 mb-2 h-12;
  }
</style>
