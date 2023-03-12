<template>
  <div class="fs-input">
    <Icon
      v-if="icon"
      :name="icon"
      class="input-icon"
    />

    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="{ '!pl-9': icon }"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
import { Icon } from '#components'

defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.fs-input {
  @apply relative block;
}

.input-icon {
  @apply pointer-events-none absolute top-1/2 left-3
    transform -translate-y-1/2 text-gray-400;
}

input {
  @apply  w-full border border-gray-200 rounded px-4 py-2
    mt-1.5 lg:mt-3 focus:outline-0 focus:border-gray-400 block;
}
</style>
