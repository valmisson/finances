<template>
  <div class="form-skeleton">
    <div :class="`form-fields-skeleton form-cols-${fieldsNumber}`">
      <div
        v-for="field in fieldsNumber"
        :key="field"
        class="form-field-skeleton"
      >
        <div class="form-label-skeleton">
          <span>form label skeleton</span>
        </div>

        <div class="form-input-skeleton">
          <span>form input skeleton</span>
        </div>
      </div>
    </div>

    <div class="form-actions-skeleton">
      <div class="form-btn-skeleton">
        <span>form button skeleton</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fieldsNumber: number
}>()
</script>

<style scoped>
  .form-skeleton {
    @apply py-2;
  }

  .form-fields-skeleton {
    @apply grid grid-cols-1 max-lg:gap-y-3 gap-x-4 lg:gap-x-8 ;
  }

  .form-cols-3 {
    @apply lg:grid-cols-3;
  }

  .form-cols-4 {
    @apply lg:grid-cols-4;
  }

  .form-label-skeleton,
  .form-input-skeleton,
  .form-btn-skeleton {
    @apply bg-gray-100 rounded animate-pulse;
  }

  .form-label-skeleton {
    @apply w-1/5 h-4;
  }

  .form-input-skeleton {
    @apply w-full h-10 mt-4;
  }

  .form-input-skeleton,
  .form-btn-skeleton {
    @apply border border-gray-200;
  }

  .form-actions-skeleton {
    @apply flex justify-end mt-7
  }

  .form-btn-skeleton {
    @apply w-28 h-12;
  }

  .form-label-skeleton span,
  .form-input-skeleton span,
  .form-btn-skeleton span {
    @apply sr-only;
  }
</style>
