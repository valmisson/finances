<template>
  <base-subtitle>
    {{ title }}
  </base-subtitle>

  <base-breadcrumb
    v-if="breadcrumbs"
    :items="breadcrumbs"
  />

  <div v-if="flat" class="new-item">
    <slot />
  </div>

  <base-card v-else class="new-item">
    <slot />
  </base-card>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '~/types/components/breadcrumb'

const props = defineProps<{
 title: string;
  breadcrumbs?: Breadcrumb[];
  flat?: boolean
}>()

useHead({
  title: props.title
})
</script>

<style scoped>
  .new-item {
    @apply mb-8;
  }
</style>
