<template>
  <div class="fs-input">
    <Icon
      v-if="icon"
      :name="icon"
      class="input-icon"
    />

    <input
      v-bind="{ ...props, ...$attrs }"
      v-model="model"
      :value="model"
      :class="{ '!pl-9': icon }"
    >
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder: string;
    required: boolean;
    icon?: string;
    min?: string;
    max?: string;
  }>(),
  {
    type: 'text',
    icon: undefined,
    min: undefined,
    max: undefined
  }
)

const model = defineModel<string | number | undefined>()
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
