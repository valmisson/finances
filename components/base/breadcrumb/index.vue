<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
      >
        <div class="breadcrumb-icon">
          /
        </div>

        <NuxtLink
          v-if="item?.href"
          :to="item?.href"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </NuxtLink>

        <span v-else>
          {{ item.text }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { Breadcrumb } from '~/types/components/breadcrumb'

defineProps<{
  items: Breadcrumb[]
}>()
</script>

<style scoped>
  .breadcrumb {
    @apply my-6;
  }

  .breadcrumb-list {
    @apply flex;
  }

  .breadcrumb-item {
    @apply flex items-center gap-4 text-gray-400
      text-sm;
  }

  .breadcrumb-item:first-child .breadcrumb-icon {
    @apply hidden;
  }

  .breadcrumb-icon {
    @apply ml-4;
  }

  .breadcrumb-link {
    @apply text-primary hover:underline;
  }
</style>
