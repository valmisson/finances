<template>
  <section class="table-skeleton">
    <div
      v-for="item in itemsLength"
      :key="item"
      class="table-items-skeleton"
    >
      <div
        v-for="col in cols"
        :key="col"
        class="table-item-skeleton"
      >
        <span>table td skeleton</span>
      </div>

      <div v-if="actions" class="table-actions-skeleton">
        <div class="actions-item-skeleton">
          <span>table actions skeleton</span>
        </div>

        <div class="actions-item-skeleton">
          <span>table actions skeleton</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cols: number,
  actions: boolean
}>()

const itemsLength = 4
</script>

<style scoped>
  .card .table-skeleton {
    @apply px-0 py-0;
  }

  .table-skeleton {
    @apply bg-white px-4 py-4;
  }

  .table-items-skeleton {
    @apply flex justify-between gap-8 py-3;
  }

  .table-item-skeleton span,
  .actions-item-skeleton span {
    @apply sr-only;
  }

  .table-item-skeleton,
  .actions-item-skeleton {
    @apply w-full h-4 bg-gray-100 animate-pulse;
  }

  .table-actions-skeleton {
    @apply w-2/4 flex justify-between gap-4;
  }
</style>
