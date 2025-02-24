<template>
  <div class="fs-input">
    <select
      v-model="model"
      :required="required"
    >
      <option
        value=""
        selected
        disabled
      >
        {{ props.placeholder }}
      </option>

      <option
        v-for="item in props.items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { SelectItems } from '~/types/components/select'

const props = defineProps<{
  items: SelectItems[];
  placeholder: string;
  required: boolean;
}>()

const model = defineModel<string>()
</script>

<style scoped>
.fs-input {
  @apply relative block;
}

select {
  @apply  w-full border border-gray-200 rounded px-4 py-2
    mt-1.5 lg:mt-3 focus:outline-0 focus:border-gray-400 block;
}

option {
  @apply py-6;
}
</style>
