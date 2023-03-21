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
      max-lg:gap-y-3 gap-x-4 lg:gap-x-8 pt-1;
  }

  .form-label-skeleton,
  .form-input-skeleton,
  .form-btn-skeleton {
    @apply bg-gradient-to-l to-zinc-200 from-zinc-100
    rounded animate-pulse;
  }

  .form-label-skeleton {
    @apply w-2/6 h-4;
  }

  .form-input-skeleton {
    @apply w-full h-9 mt-3;
  }

  .form-actions-skeleton {
    @apply col-span-1 lg:col-span-3 flex justify-end mt-7
  }

  .form-btn-skeleton {
    @apply w-28 h-10;
  }

  .form-label-skeleton span,
  .form-input-skeleton span,
  .form-btn-skeleton span {
    @apply sr-only;
  }
</style>
