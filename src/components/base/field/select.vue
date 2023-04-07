<template>
  <div class="fs-input">
    <select
      v-model="selectedItem"
      :required="required"
      @input="$emit('update:modelValue', $event?.target?.value)"
    >
      <option
        :value="null"
        selected
      >
        {{ placeholder }}
      </option>

      <option
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { SelectItems } from '~/types/components/select'

defineEmits(['update:modelValue'])

const props = defineProps<{
  items: SelectItems[]
  placeholder: string
  required: boolean
  modelValue?: any
}>()

const selectedItem = computed(() => props.modelValue)
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
