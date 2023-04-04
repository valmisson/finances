<template>
  <section class="table-skeleton">
    <div class="table-items-skeleton table-head-skeleton">
      <div
        v-for="col in cols"
        :key="'th-' + col"
        class="table-item-skeleton"
      >
        <div class="th-items-skeleton">
          <span>table th skeleton</span>
        </div>
      </div>

      <div v-if="actions" class="table-actions-skeleton">
        <div class="actions-item-skeleton">
          <span>table actions skeleton</span>
        </div>
      </div>
    </div>

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
    @apply flex justify-between gap-8 py-3 last:pb-1;
  }

  .table-item-skeleton span,
  .actions-item-skeleton span {
    @apply sr-only;
  }

  .table-head-skeleton {
    @apply pt-0;
  }

  .card .table-head-skeleton {
    @apply pt-3;
  }

  .table-head-skeleton .table-item-skeleton,
  .table-head-skeleton .actions-item-skeleton {
    @apply bg-transparent;
  }

  .th-items-skeleton {
    @apply w-1/3 h-full bg-gray-100 animate-pulse;
  }

  .table-item-skeleton,
  .actions-item-skeleton {
    @apply w-full h-4 bg-gray-100 animate-pulse;
  }

  .table-actions-skeleton {
    @apply w-2/4 flex justify-between gap-4;
  }
</style>
