<template>
  <div class="table-item">
    <Icon
      v-if="icon"
      :name="icon"
      :class="`table-item-icon ${iconColor} ${iconSize}`"
    />

    <span :class="`table-item-value ${textColor} ${ellipsis && 'ellipsis'}`">
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components'

defineProps({
  value: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  },
  iconColor: {
    type: String,
    default: ''
  },
  iconSize: {
    type: String,
    default: 'text-xl'
  },
  ellipsis: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
  .table-item {
    @apply flex items-center lg:ml-5 first:ml-0;
  }

  .table-item-icon {
    @apply mr-1.5 lg:mr-2.5 block;
  }

  .ellipsis {
    @apply whitespace-nowrap text-ellipsis overflow-hidden;
  }
</style>
