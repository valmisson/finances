<template>
  <section class="form-skeleton">
    <div
      v-for="item in 3"
      :key="item"
      class="form-field"
    >
      <div class="form-label-skeleton">
        <span>form label skeleton</span>
      </div>

      <div class="form-input-skeleton">
        <span>form input skeleton</span>
      </div>
    </div>

    <div class="form-actions-skeleton">
      <div class="form-btn-skeleton">
        <span>form button skeleton</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .form-skeleton {
    @apply grid grid-cols-1 lg:grid-cols-3
      max-lg:gap-y-3 gap-x-4 lg:gap-x-8 py-2;
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
    @apply col-span-1 lg:col-span-3 flex justify-end mt-7
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
